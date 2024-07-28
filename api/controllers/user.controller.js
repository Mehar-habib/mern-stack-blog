import asyncHandler from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const test = asyncHandler(async (req, res) => {
  res.json({ message: "API is working fine" });
});

const updateUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.userId) {
    throw new ApiError(401, "you are not allowed to update this user");
  }

  // Check and hash password if provided
  if (req.body.password) {
    if (req.body.password.length < 6) {
      throw new ApiError(400, "password must be at least 6 characters");
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  // Validate and normalize username if provided
  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 15) {
      throw new ApiError(400, "username must be between 5 and 15 characters");
    }
    if (req.body.username.includes(" ")) {
      throw new ApiError(400, "username must not contain any spaces");
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      throw new ApiError(400, "username must only contain letters and numbers");
    }
    if (
      req.user.username &&
      req.body.username !== req.user.username.toLowerCase()
    ) {
      throw new ApiError(400, "Username must be lowercase");
    }
  }

  try {
    // Filter out undefined values from the update object
    const updateData = {
      username: req.body.username,
      password: req.body.password,
      profilePicture: req.body.profilePicture,
      email: req.body.email,
    };

    // Remove undefined keys
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateData },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;
    return res
      .status(200)
      .json(new ApiResponse(200, others, "User updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { test, updateUser };
