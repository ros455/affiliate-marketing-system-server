import mongoose from "mongoose";

const PaymentRequestSchema = new mongoose.Schema({
    sum: Number,
    comment: String,
    wallet: String,
    method: String,
    date: String,
    status: String,
    partner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model('PaymentRequest',PaymentRequestSchema)