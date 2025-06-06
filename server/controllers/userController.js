import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
      },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    const newAccessToken = generateAccessToken(user);
    const newrefreshToken = generateRefreshToken(user);

    user.refreshToken = newrefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById({ _id: decoded.id, refreshToken });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    const newrefreshToken = generateRefreshToken(user);

    user.refreshToken = newrefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(204);

    const user = await User.findOne({ refreshToken: token });
    if (user) {
      (user.refreshToken = ""), await user.save();
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
