import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
// import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; // Add this import
import { sendVerificationEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
    
        if (!email || !password || !name) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        
        await user.save();

        // Generate JWT and set cookie
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({ 
            success: true, 
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined, 
                verificationToken: undefined, 
                verificationExpiresAt: undefined
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}