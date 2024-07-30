import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/post.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const createAdminPost = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(401, "you are not allowed to create post");
  }
  if (!req.body.title || !req.body.content) {
    throw new ApiError(400, "title and content are required");
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    return res
      .status(200)
      .json(new ApiResponse(200, savedPost, "Post created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { createAdminPost };
