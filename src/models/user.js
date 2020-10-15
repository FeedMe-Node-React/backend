import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema (
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "I'm a new member!"
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);