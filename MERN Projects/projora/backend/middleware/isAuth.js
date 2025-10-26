import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      // Use 401 (Unauthorized)
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // This line does all the work:
    // 1. If valid, it returns the payload.
    // 2. If invalid (expired, bad signature), it throws an error.
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // If the code reaches this line, the token is VALID.
    // The "if(!verifyToken)" check is not needed because the 'catch'
    // block would have already caught any errors.
    
    req.userId = decodedPayload.userId;
    next(); // Continue to the next function (e.g., getCurrentUser)

  } catch (error) {
    // This block only runs if jwt.verify() fails.
    console.log("isAuth Error:", error.message); 
    
    // Use 401 (Unauthorized) to tell the client their token is bad.
    return res.status(401).json({ 
      message: "Token is not valid",
      error: error.message 
    });
  }
};

export default isAuth;