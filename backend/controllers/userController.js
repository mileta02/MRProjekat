import { asyncErrorCatcher } from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.js";
import { getDataUri, sendJsonToken } from "../utils/features.js";
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