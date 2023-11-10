import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        default: false,
        require: true,
    },
}, { timestamps: true });

export default mongoose.model('Admin',AdminSchema)