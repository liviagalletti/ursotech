const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Referência ao modelo Post
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Comment = mongoose.model('Comment', commentSchema);
  
  module.exports = Comment;