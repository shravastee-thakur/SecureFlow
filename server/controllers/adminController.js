import User from "../models/userModel.js";

export const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return res
        .status(401)
        .json({ success: false, message: "Users not found" });
    }

    if (allUsers.length === 0) {
      return res.json({ message: "No user in database" });
    }

    return res.status(200).json({
      success: true,
      data: allUsers,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (req.user.id === userId) {
      return res
        .status(404)
        .json({ success: false, message: "You cannot delete yourself" });
    }

    const deleteUser = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
