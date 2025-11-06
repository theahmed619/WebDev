import sendMail from "../config/sendMail.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email } = req.body;

    if (email === process.env.ADMIN_EMAIL ) {
      const otp = Math.floor(Math.random() * 1000000);

      const verifyToken = jwt.sign({ email, otp }, process.env.Activation_sec, {
        expiresIn: "5m",
      });

      await sendMail(email, "FantasyHub", otp);

      res.json({
        message: "Otp send to your mail",
        verifyToken,
      });
    } else {
     
      return res.status(403).json({
        message: "This email is not authorized to log in.",
      });
    }
  } catch (error) {
    console.log("Login error");
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;

    const verify = jwt.verify(verifyToken, process.env.Activation_sec);

    if (!verify)
      return res.status(400).json({
        message: "Otp Expired or invalid token",
      });

    if (Number(verify.otp) !== Number(otp))
      return res.status(400).json({
        message: "Wrong otp",
      });

    const userEmail = verify.email;

    const token = jwt.sign({ email: userEmail }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    res.json({
      message: "Logged in successfully",
      user: {
        email: userEmail,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const myProfile = (req, res) => {
  try {
  
  
    const user = req.user;

    if (!user) {
     
      return res.status(404).json({ message: "User data not found on request" });
    }

    
    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
