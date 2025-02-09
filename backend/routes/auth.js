import express from 'express';
import bcrypt from 'bcryptjs';  
import User from '../model/User.js'; 
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', status: false });
        }

        // Hash the password
        const hashPassword = password ? await bcrypt.hash(password, 10) : null;

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', status: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', status: false, error });
    }   
});

// router.post('/login' , async(req , res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email })
//     if (!user) {
//         return res.status(400).json({ message: 'User not found', status: false });
//     }

//     const ValidPassword = await bcrypt.compare(password, user.password);
//     if (!ValidPassword) {
//         return res.status(400).json({ message: 'Password is Incorrect', status: false });
//     }

//     const token = jwt.sign({username: user.username}, process.env.KEY,{expiresIn: '1h'})
//         res.cookie('token', token, { httpOnly: true , maxAge :3600000});
//         return res.status(200).json({ message: 'User logged in successfully', status: true });
// })

router.post('/login', async(req, res) => {
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
        const token = jwt.sign({username: user.username}, process.env.KEY,{ expiresIn: '1h'});

        // Send both cookie and session
        res.cookie('token', token, {httpOnly: true, maxAge: 3600000,});
        

        return res.status(200).json({ 
            message: 'User logged in successfully', 
            status: true,
            user: {
                id: user._id,
                email: user.email,
                username: user.username || email.split('@')[0]
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error', status: false });
    }
});






export default router;
