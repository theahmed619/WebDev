import sendMail from "../middlewares/sendMail.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
      });
    }

    const otp = Math.floor(Math.random() * 1000000);

    const verifyToken = jwt.sign({ user, otp }, process.env.Activation_sec, {
      expiresIn: "5m",
    });

    await sendMail(email, "ChatBot", otp);

    res.json({
      message: "Otp send to your mail",
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;

    const verify = jwt.verify(verifyToken, process.env.Activation_sec);

    if (!verify)
      return res.status(400).json({
        message: "Otp Expired",
      });

    if (verify.otp !== otp)
      return res.status(400).json({
        message: "Wrong otp",
      });

    const token = jwt.sign({ _id: verify.user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    res.json({
      message: "Logged in successfully",
      user: verify.user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// --- THIS FUNCTION IS NEW ---
// It is INSECURE and trusts the frontend
export const googleAuth = async (req, res) => {
  try {
    // 1. Get email and name directly from req.body
    // We are TRUSTING this data is correct.
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        message: "Email and Name are required",
      });
    }

    // 2. Find user by email
    let user = await User.findOne({ email });

    if (user) {
      // User exists. Update their name if it's missing.
      user.name = user.name || name;
      await user.save();
    } else {
      // This is a new user.
      user = await User.create({
        name,
        email,
        // We don't save googleId because we can't trust it
      });
    }

    // 3. Create your app's own JWT
    const token = jwt.sign({ _id: user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    // 4. Send back your token and user data
    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Google Auth Failed",
    });
  }
};
// --- END OF NEW FUNCTION ---

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
