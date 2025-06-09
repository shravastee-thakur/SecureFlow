import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils.js";
import transporter from "../config/nodemailer.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

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
      role,
    });

    // Send verification email

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to our website",
      text: `Your account has been created with email: ${email}`,
    };

    await transporter.sendMail(mailOption);

    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// send otp
export const loginStepOne = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    // Generate otp

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.otp = otp;
    user.otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    //Send otp via email
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Your 2FA Login OTP",
      text: `Your OTP for login is: ${otp}, expires in 5 mins`,
    };

    await transporter.sendMail(mailOption);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email. Please verify to complete login.",
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

// send token after verification
export const verifyLoginOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or OTP" });
    }

    const user = await User.findById(userId).select("+otp +otpExpiredAt");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    if (user.otpExpiredAt < Date.now()) {
      return res.status(401).json({ success: false, message: "OTP expired" });
    }

    if (!user.isVerified) {
      user.isVerified = true;
    }

    (user.otp = ""), (user.otpExpiredAt = undefined);

    const newAccessToken = generateAccessToken(user);
    const newrefreshToken = generateRefreshToken(user);

    user.refreshToken = newrefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        accessToken: newAccessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
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
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        accessToken: newAccessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordRequest = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user._id}`;

    console.log("RESET LINK:", resetLink);
    console.log("Stored hashedToken:", user.resetPasswordToken);
    console.log("Expires at:", new Date(user.resetPasswordExpires));

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset Your Password",
      text: `Click to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOption);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
      resetLink,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, userId, newPassword } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    console.log("Received userId:", userId);
    console.log("Received token:", token);
    console.log("Hashed incoming token:", hashedToken);

    const user = await User.findOne({
      _id: userId, // No need for mongoose.Types.ObjectId if userId is already valid
      resetPasswordToken: hashedToken, // Compare directly with stored hashed token
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or expired" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
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
