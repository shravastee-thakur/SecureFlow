import joi from "joi";

export const registerSchema = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(30).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name cannot be more than 30 characters",
    }),

    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),

    password: joi.string().min(6).max(14).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
    }),
    role: joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  next();
};

export const loginSchema = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),

    password: joi.string().min(6).max(14).required().messages({
      "string.empty": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  next();
};

export const otpVerificationSchema = (req, res, next) => {
  const schema = joi.object({
    userId: joi.string().required().messages({
      "string.empty": "User ID is required",
      "any.required": "User ID is required",
    }),
    otp: joi.string().length(6).required().messages({
      "string.empty": "OTP is required",
      "string.length": "OTP must be exactly 6 digits",
      "any.required": "OTP is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  next();
};

export const resetPasswordRequestSchema = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().trim().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  next();
};

export const resetPasswordSchema = (req, res, next) => {
  const schema = joi.object({
    token: joi.string().required(),
    userId: joi.string().required(),
    newPassword: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  next();
};
