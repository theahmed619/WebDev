import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "Not Authorized Login Again" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "Not Authorized Login Again, Invalid token" });
    }
    req.adminEmail = process.env.ADMIN_EMAIL;

    next();
  } catch (error) {
    console.log("adminAuth error", error);
    return res.status(500).json({ message: `adminAuth error ${error}` });
  }
};

export default adminAuth;
// import jwt from 'jsonwebtoken';

// const adminAuth = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       return res.status(401).json({ message: "Not Authorized, no token" });
//     }

//     // Yeh token verify karega. Galat hua toh seedha 'catch' mein jaayega.
//     const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

//     // --- FIX 1 ---
//     // Woh bekaar ka if(!verifyToken) check hata diya gaya hai.

//     // --- FIX 2 ---
//     // Email ko .env se nahi, seedha TOKEN se nikaalo
//     req.adminEmail = verifyToken.email;

//     // (Extra Check) Ab check karo ki jo email token se mila,
//     // kya woh sach mein admin ka email hai?
//     if (req.adminEmail !== process.env.ADMIN_EMAIL) {
//         return res.status(403).json({ message: "Not an admin user" });
//     }

//     next(); // Sab theek hai, aage badho

//   } catch (error) {
//     // Agar token invalid (expired, galat) hai toh code yahan aayega
//     console.log("adminAuth error:", error.message);
//     return res.status(401).json({
//         message: "Token is not valid or expired"
//     });
//   }
// };

// export default adminAuth;
