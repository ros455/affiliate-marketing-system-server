import mongoose from "mongoose";

const PaymantsMethodSchema = new mongoose.Schema({
    name: String
}, { timestamps: true });

export default mongoose.model('PaymantsMethod',PaymantsMethodSchema)