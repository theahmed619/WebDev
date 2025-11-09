import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Helper function to create a token
// It uses your "Jwt_sec" and puts the user's email in the payload
// This is exactly what your isAuth.js middleware expects
const createToken = (email, userId) => {
  // We'll add userId to the token payload
  return jwt.sign({ email, userId }, process.env.Jwt_sec, {
    expiresIn: "5d",
  });
};

// 1. NEW: User Registration (Email/Password)
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // --- Validation ---
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    // --- End Validation ---

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({ name, email, password: hashPassword });

    // Create token
    const token = createToken(user.email, user._id);

    // Send user data and token back
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        purchasedProjects: user.purchasedProjects,
      },
      token,
    });
  } catch (error) {
    console.log("registration error", error);
    return res.status(500).json({ message: "Registration error" });
  }
};

// 2. NEW: User Login (Email/Password)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user was a Google sign-up (no password)
    if (!user.password) {
      return res.status(400).json({ message: "This account uses Google Sign-In." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create token
    const token = createToken(user.email, user._id);

    // Send user data and token back
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        purchasedProjects: user.purchasedProjects,
      },
      token,
    });
  } catch (error) {
    console.log("login error", error);
    return res.status(500).json({ message: "Login error" });
  }
};

// 3. NEW: Google Login / Registration
export const googleLogin = async (req, res) => {
  try {
    // Data from Firebase on the client
    const { name, email, googleId } = req.body;
    if (!name || !email || !googleId) {
        return res.status(400).json({ message: "Google auth info missing." });
    }

    let user = await User.findOne({ email });

    if (user) {
      // User already exists.
      // Check if they signed up with email first
      if (user.password) {
           return res.status(400).json({ message: "An account with this email already exists. Please log in with your password." });
      }

      // If no password, they are a Google user. Just log them in.
      const token = createToken(user.email, user._id);
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          purchasedProjects: user.purchasedProjects,
        },
        token,
      });

    } else {
      // User does not exist, create a new account for them
      const newUser = await User.create({
        name,
        email,
        googleId,
        // password field is omitted
      });

      // Create token for the new user
      const token = createToken(newUser.email, newUser._id);

      return res.status(201).json({
        message: "User registered and logged in successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          purchasedProjects: newUser.purchasedProjects,
        },
        token,
      });
    }
  } catch (error) {
    console.log("googleLogin error: ", error);
    // Handle duplicate key error for googleId if a user tries to sign up with Google
    // when they already have an email/pass account
    if (error.code === 11000) {
        return res.status(400).json({ message: "An account with this email already exists. Please log in with your password." });
    }
    return res.status(500).json({ message: `Google login error` });
  }
};

// 4. UPDATED: Fetch User Profile
// This now uses the email from your isAuth middleware to find the full user
export const myProfile = async (req, res) => {
  try {
    // req.user.email and req.user.userId are coming from your isAuth middleware
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the full user object back
    res.status(200).json(user); // This will include the 'purchasedProjects' array

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};