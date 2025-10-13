const jwt = require("jsonwebtoken");
const User = require("../model/user.model");


const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token, "NOIHFCWUERHW734VJ4UKCV8YW48Y");

    if (!verifiedToken) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    const verifiedUser = await User.findOne({
      Email: verifiedToken?.email,
    }).select("-Password");

    if (!verifiedUser) {
      return res.status(401).json({
        message: "Not a valid user",
        success: false,
      });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        message: "Token Expired!",
        success: false,
      });
    }

    if (error.name == "JsonWebTokenError") {
      return res.status(403).json({
        message: "Invalid Token authentication failed",
        success: false,
      });
    }

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports=authMiddleWare;
