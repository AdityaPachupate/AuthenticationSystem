import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import { connectDb } from "./db/connectDb.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware , this will allow us to parse JSON bodies
app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// Improved server startup with error handling
app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
});

