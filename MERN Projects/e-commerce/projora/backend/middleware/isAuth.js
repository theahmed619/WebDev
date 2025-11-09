import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.headers.token;

    if (!token) {
      return res.status(403).json({
        message: "Please login",
      });
    }

    // 2. Verify the token
    const decode = jwt.verify(token, process.env.Jwt_sec);

    // 3. CRITICAL CHANGE: Attach the *entire* decoded object
    // This object contains both { email, userId, iat, exp }
    req.user = decode;

    next();

  } catch (error) {
    res.status(500).json({
      message: "Login First or Invalid Token",
      error: error.message,
    });
  }
};