import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
      type: String,
      required: true,
  },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
    cmt: {
      type: String,
      required: true,
      default: '',
    },
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
