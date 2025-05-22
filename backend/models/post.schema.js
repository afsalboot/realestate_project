const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    bedroom: { type: Number, required: true, min: 0 },
    bathroom: { type: Number, required: true, min: 0 },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    type: {
      type: String,
      enum: ['buy', 'rent'], 
      required: true,
    },
    property: {
      type: String,
      enum: ['apartment', 'house', 'condo', 'land'], 
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostDetail',
      default: null,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedPost',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
