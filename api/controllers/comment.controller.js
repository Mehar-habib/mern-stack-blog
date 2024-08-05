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

const getPostComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, comments, "fetch comments successfully!"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const likeComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      throw new ApiError(404, "comment not found!");
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    return res.status(200).json(new ApiResponse(200, comment, "Done"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const editComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      throw new ApiError(404, "Comment not Found");
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      throw new ApiError(403, "you are not allowed to edit this comment");
    }
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res
      .status(200)
      .json(new ApiResponse(200, editComment, "Edit Successfully!"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
export { createComment, getPostComments, likeComment, editComment };
