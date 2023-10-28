import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
    },
    name: String,
    password: {
        required: true,
        type: String,
    },
    disabled: {
        type:Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        require: true,
    },
    isPartner: {
        type: Boolean,
        default: true,
        require: true,
    },
}, { timestamps: true });

export default mongoose.model('User',UserSchema)