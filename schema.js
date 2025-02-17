const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

const blogPostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    minlength: 5,
    required: true,
  },
  content: {
    type: String,
    minlength: 50,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: [String],
  category: {
    type: String,
    default: "General",
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  comments: [commentSchema],
});

blogPostSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
const comment = mongoose.model("comment", commentSchema);

module.exports = BlogPost;
