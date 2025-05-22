const mongoose = require('mongoose');

const postDetailSchema = new mongoose.Schema(
    {
        desc: { type: String, required: true},
        utilities: { type: String, default: null },
        pet: { type: String, default: null },
        income: { type: String, default: null },
        size: { type: Number, default: null, min: 0 },
        school: { type: Number, default: null, min: 0 },
        bus: { type: Number, default: null, min: 0 },
        restaurant: {
            type: Number,
            default: null,
            min: 0,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('PostDetail', postDetailSchema);
