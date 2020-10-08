const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate')

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: { select: ['name'] },
        },
        date: {
            type: String,
            default: new Date().toISOString(),
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    { 
        timestamps: true,
    },
);
PostSchema.plugin(autopopulate)

module.exports = mongoose.model('Post', PostSchema);