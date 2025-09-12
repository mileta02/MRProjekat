import { asyncErrorCatcher } from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.js";
import { getDataUri, sendEmail, sendJsonToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

//Login
export const login = asyncErrorCatcher(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (user == null) {
    return next(new ErrorHandler("User with this email doesn't exist.", 400))
  }

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return next(new ErrorHandler("Incorrect password.", 400));
  }

  sendJsonToken(user, res, "Login successfully.", 200);
});

//Register
export const register = asyncErrorCatcher(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User with this email already exists.", 400));
  }

  let avatar = undefined;
  if (req.file) {
    const file = getDataUri(req.file);
    const uploadResult = await cloudinary.v2.uploader.upload(file.content);
    avatar = {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url
    }
  }

  user = await User.create({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
    avatar
  });

  sendJsonToken(user, res, "Registered successfully.", 201);
});

//GetLoggedUserProfile
export const getMyProfile = asyncErrorCatcher(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
})

//UpdateProfile
export const updateProfile = asyncErrorCatcher(async (req, res, next) => {
  const user = req.user;
  const { name, surname, email, address, city, country, pinCode } = req.body;

  if (name) user.name = name;
  if (surname) user.surname = surname;
  if (email) user.email = email;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (pinCode) user.pinCode = pinCode;

  await user.save();
  res.status(200).json({ success: true, message: "Profile updated successfully." })
})

//ChangePassword
export const changePassword = asyncErrorCatcher(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please enter old and new password.", 400));
  }
  const isMatched = await user.comparePassword(oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Incorrect old password.", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ success: true, message: "Password changed successfully." })
})

//Logout
export const logout = asyncErrorCatcher(async (req, res, next) => {
  res.status(200).cookie("token", "",
    {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0)
    }).json({
      success: true,
      message: "Successfully logged out."
    })
})

//UpdateProfilePicture
export const updateProfilePicture = asyncErrorCatcher(async (req, res, next) => {
  const user = req.user;

  const file = getDataUri(req.file);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  const uploadResult = await cloudinary.v2.uploader.upload(file.content);
  user.avatar = {
    public_id: uploadResult.public_id,
    url: uploadResult.secure_url
  };
  await user.save();
  res.status(200).json({ success: true, message: "Profile picture updated successfully." });
})

//ResetPassword (forget & reset logic)
export const forgetPassword = asyncErrorCatcher(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email })

  if (!user) {
    return next(new ErrorHandler("User with this email doesn't exist.", 404));
  }

  const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
  const otpExpire = 15 * 60 * 1000;

  user.otp = otp;
  user.otpExpire = new Date(Date.now() + otpExpire);
console.log("Now:", Date.now());
console.log("User otpExpire:", user.otpExpire.getTime());
  await user.save();
  try {
    await sendEmail("Password reset", user.email, `Your reset password code is: ${otp}.`);
  } catch (error) {
    user.otp = null;
    user.otpExpire = null;
    await user.save();
    return next(error);
  }
  res.status(200).json({ success: true, message: "Email successfully sent, please check your inbox." });
})

export const resetPassword = asyncErrorCatcher(async (req, res, next) => {
  const { otp, password } = req.body || {};
  if (!otp || !password) {
    return next(new ErrorHandler("Please enter otp and new password.", 400));
  }
  const user = await User.findOne({
    otp,
    otpExpire: {
      $gt: Date.now()
    }
  })

  if (!user) {
    return next(new ErrorHandler("Incorrect or expired otp.", 400));
  }

  user.password = password;
  user.otp = null;
  user.otpExpire = null;

  await user.save();

  res.status(200).json({ success: true, message: "Successfully reseted password, please log in." });
})