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
    desc: { type: String, required: true},
    utilities: { type: String, default: null },
    pet: { type: String, default: null },
    income: { type: String, default: null },
    size: { type: Number, default: null, min: 0 },
    school: { type: Number, default: null, min: 0 },
    bus: { type: Number, default: null, min: 0 },
    restaurant: { type: Number, default: null, min: 0,},
    type: { type: String, enum: ['buy', 'rent'], required: true,},
    property: { type: String, enum: ['apartment', 'house', 'condo', 'land'], required: true, },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    // postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true, unique: true, },
    // postDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'PostDetail', default: null, },
    // savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SavedPost' },],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
