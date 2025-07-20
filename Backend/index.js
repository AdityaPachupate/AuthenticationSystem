import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

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

