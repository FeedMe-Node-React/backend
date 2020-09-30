const mongoose = require('mongoose');
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
        creator: {
            type: Object,
            require: true,
        },
        date: {
            type: String,
            default: new Date().toISOString(),
            required: true,
        },
        imageUrl: {
            type: String,
            default: '',
            required: false,
        },
    },
    { 
        timestamps: true,
    },
) 

module.exports = mongoose.model('Post', PostSchema)