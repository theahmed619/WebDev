const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "NOIHFCWUERHW734VJ4UKCV8YW48Y";

const handleSignupUserController = async (req, res) => {
  const body = req.body;
  if (!body?.FirstName || !body?.Email || !body?.Password) {
    return res.status(500).json({
      message: "All fields are required",
      status: false,
    });
  }

  try {
    const saltCount = 10;

    const hashedPassword = await bcrypt.hash(body.Password, saltCount);

    const signup = await User.insertOne({ ...body, Password: hashedPassword });
    if (signup) {
      return res.status(201).json({
        message: "User Created Successfully",
        success: true,
        id: signup?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const handleSigninUserController = async (req, res) => {
  const body = req.body;
 // console.log("Email ",body)
  try {
    if (!body.Email || !body.Password) {
      return res.status(500).json({
        message: "Enter Email and Password",
        success: false,
      });
    }

    const user = await User.findOne({ Email: body.Email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      body.Password,
      user.Password
    );
    console.log("isPasswordMatcg", isPasswordMatched);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Password does't match",
        success: false,
      });
    }

    const token = jwt.sign({ email: user?.Email, id: user?._id }, SECRET_KEY);

    return res.status(200).json({
      message: "User Login Successfully",
      success: true,
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

module.exports = { handleSignupUserController, handleSigninUserController };
