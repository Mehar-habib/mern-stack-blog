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
    throw new ApiError(403, "You are not allowed to update this user");
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters");
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      throw new ApiError(400, "Username must be between 7 and 20 characters");
    }
    if (req.body.username.includes(" ")) {
      throw new ApiError(400, "Username cannot contain spaces");
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      throw new ApiError(400, "Username must be lowercase");
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      throw new ApiError(400, "Username can only contain letters and numbers");
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      return res
        .status(200)
        .json(new ApiResponse(200, rest, "User updated successfully"));
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    throw new ApiError(403, "You are not allowed to delete this user");
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const signOutAccount = asyncHandler(async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json(new ApiResponse(200, null, "Signed out successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getUsersByAdmin = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(403, "You are not allowed to see all users");
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUser = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json(
      new ApiResponse(200, {
        users: userWithoutPassword,
        totalUser,
        lastMonthUsers,
      })
    );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { test, updateUser, deleteAccount, signOutAccount, getUsersByAdmin };
