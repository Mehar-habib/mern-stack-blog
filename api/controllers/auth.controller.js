import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json(new ApiResponse(201, newUser, "Signed up successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw new ApiError(404, "User not found");
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throw new ApiError(401, "Invalid credentials");
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...others } = validUser._doc;
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(new ApiResponse(200, others, "Signed in successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { signUp, signIn };
