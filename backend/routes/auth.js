import express from 'express';
import bcrypt from 'bcryptjs';  
import User from '../model/User.js'; 
import jwt from 'jsonwebtoken';


const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { displayName, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', status: false });
        }
        // Hash the password
        const hashPassword = password ? await bcrypt.hash(password, 10) : null;
        // Create new user
        const newUser = new User({
            displayName,
            email,
            password: hashPassword, // Save the hashed password
        });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully', status: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', status: false, error });
    }   
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email); // Debug log

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found', status: false });
        }

        const ValidPassword = await bcrypt.compare(password, user.password);
        if (!ValidPassword) {
            return res.status(400).json({ message: 'Password is Incorrect', status: false });
        }

        // Create token
        const token = jwt.sign({ displayName: user.displayName }, process.env.KEY, { expiresIn: '1h' });

        // Send both cookie and session
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        console.log("Logged-in user:", user); // Debug log

        return res.status(200).json({
            message: 'User logged in successfully',
            status: true,
            user: {
                id: user._id,
                email: user.email,
                displayName: user.displayName, // Use displayName instead of username
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error', status: false });
    }
});
router.get('/login/success', async (req, res) => {
    try {
        // Fetch user data from session or token
        const user = req.user; // Assuming Passport.js or similar middleware populates req.user

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }

        // Standardize the response
        const standardizedUser = {
            id: user._id,
            email: user.email,
            displayName: user.displayName, // Use displayName
        };

        res.status(200).json({ message: 'Login successful', status: true, user: standardizedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', status: false });
    }
});
// Logout Route
router.get('/logout', (req, res) => {
    try {
        // Clear the JWT token cookie
        res.clearCookie('token', {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production', // Use `true` in production (HTTPS)
            sameSite: 'Lax'
        });

        // Optionally destroy the session if you're using sessions
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    console.error('Session destruction failed:', err);
                    return res.status(500).json({ message: 'Logout failed', status: false });
                }
            });
        }

        // Respond with success message
        return res.status(200).json({ message: 'User logged out successfully', status: true });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Server error', status: false });
    }
});

export default router;