import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2";
import router from "./routes/auth.js";
import User from "./model/User.js";
import mongoose from "./db/conn.js";
import yahooFinance from "yahoo-finance2"; 
import axios from "axios";

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Use middlewares
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// **Routes**
app.use("/auth", router);

// Setup session
app.use(session({
    secret: "dineshmanju123#",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year session 
        httpOnly: true,                  
        secure: false                   
    }
}));

// Set up passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth2 Strategy
passport.use(
    new OAuth2Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });  
            if (!user) {
                // user = new User({
                //     googleId: profile.id,
                //     displayName: profile.displayName,
                //     email: profile.emails[0].value,
                //     image: profile.photos[0].value
                // });
                user = new User({
                    username: name, // Use the full name as username
                    email,
                    googleId: sub,
                    displayName: name, // Set displayName to the full name
                    image: picture,
                  });
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google OAuth login route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback route
app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/stockcrypto",
    failureRedirect: "http://localhost:3000/login"
}));

// User login success route
app.get("/login/success", async (req, res) => {
    if (req.isAuthenticated()) {  // Check if the user is authenticated
        res.status(200).json({ message: "user Login", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});

// User logout route
app.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/', httpOnly: true, secure: false, sameSite: 'Lax' });

    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Session destruction failed:', err);
                return res.status(500).json({ message: 'Logout failed' });
            }
            console.log('Session destroyed successfully');
            res.status(200).json({ message: 'Logout successful' });
        });
    } else {
        console.log('No session found');
        res.status(200).json({ message: 'No session found' });
    }
});

// Get user session data
app.get("/user", (req, res) => {
    console.log("GET /user route hit");
    if (req.session && req.session.user) {
      return res.json({ user: req.session.user });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
});

// Submit survey data
app.post("/submit-data", async (req, res) => {
    const { experience, risk } = req.body;
    if (!experience || !risk) {
        return res.status(400).json({ message: "Experience and Risk fields are required." });
    }
    try {
        console.log("Received User Data:", { experience, risk });
        res.status(200).json({ message: "Survey data received successfully!", data: { experience, risk } });
    } catch (error) {
        console.error("Error submitting survey data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get("/api/stock/:symbol", async (req, res) => {
    try {
      const symbol = req.params.symbol;
      const queryOptions = { period1: '2020-01-01', interval: '1d' };
      const result = await yahooFinance.historical(symbol, queryOptions);
  
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No historical data available" });
      }
  
      res.json(result);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      res.status(500).json({ message: "Error fetching stock data" });
    }
  });

// **Prediction API Endpoint**
app.post("/api/predict", async (req, res) => {
    try {
        const { ticker } = req.body;

        if (!ticker) {
            return res.status(400).json({ message: "Ticker is required." });
        }

        // Flask API URL
        const flaskApiUrl = "http://localhost:5000/predict";

        // Make a POST request to the Flask API
        const response = await axios.post(flaskApiUrl, {
            ticker,
        });

        // Return the prediction result to the frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error calling Flask API:", error.message);
        res.status(500).json({ message: "Error fetching prediction from Flask API" });
    }
});


const PORT = 6005;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
