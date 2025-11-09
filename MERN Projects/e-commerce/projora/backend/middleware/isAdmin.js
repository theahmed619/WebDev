// This middleware checks if the authenticated user is the admin
// It assumes 'isAuth' has already run and populated 'req.user'

export const isAdmin = async (req, res, next) => {
  try {
    // req.user.email was populated by the isAuth middleware
    const userEmail = req.user.email;

    if (userEmail === process.env.ADMIN_EMAIL) {
      // User is authenticated AND is the admin
      next();
    } else {
      // User is authenticated but is NOT the admin
      return res.status(403).json({
        message: "Access forbidden. Admin rights required.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Admin verification failed",
      error: error.message,
    });
  }
};