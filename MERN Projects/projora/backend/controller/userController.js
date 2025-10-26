import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user is not found",
      });
    }

    return res.status(200).json({
      message: "user found",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `get current user error ${error}`,
    });
  }
};
