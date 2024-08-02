import Comment from "../models/comment.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createComment = asyncHandler(async (req, res) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      throw new ApiError(403, "You are not allowed to comment on this post");
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    return res
      .status(200)
      .json(new ApiResponse(200, newComment, "Comment created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { createComment };
