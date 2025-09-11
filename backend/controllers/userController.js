import { asyncErrorCatcher } from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.js";

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

  res.status(200).json({
    success: true,
    message: "Login successfully.",
  });
});

//Register
export const register = asyncErrorCatcher(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;
  await User.create({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });

  res.status(201).json({
    success: true,
    message: "Registered successfully.",
  });
});
