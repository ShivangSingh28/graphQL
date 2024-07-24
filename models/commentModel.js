import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});

const CommentModel = mongoose.model("comments", commentSchema);

export default CommentModel;
