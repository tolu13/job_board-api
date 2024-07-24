import jwt from 'jsonwebtoken';
import User from '../model/User.js'; // Adjust path as per your project structure
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

// Middleware function to verify token
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Authorization denied' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = await User.findById(decoded.userId); // Attach user object to request
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;


export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract JWT token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "Authorization token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token, authorization failed" });
    }
};


export const restrictToCompany = async (req, res, next) => {
    const userId = req.userData.userId;

    try {
        const user = await User.findById(userId);
        if (!user || user.user_type !== 'company') {
            return res.status(403).json({ message: "Forbidden, only companies can access this resource" });
        }
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const restrictToJobSeeker = async (req, res, next) => {
    const userId = req.userData.userId;

    try {
        const user = await User.findById(userId);
        if (!user || user.user_type !== 'job_seeker') {
            return res.status(403).json({ message: "Forbidden, only job seekers can access this resource" });
        }
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};