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
    link: {
        type: String,
        default: ''
    },
    promotionalCode: {
        type: String,
        default: ''
    },
    bonus: {
        type: Number,
        default: 1
    },
    balance: {
        type: Number,
        default: 0
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
    walletAddress: {
        type: String,
        default: ''
    },
    historyOfWithdrawals: [{
        sum: Number,
        date: String,
        status: String
    }],
    statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnerStatistic' },
}, { timestamps: true });

export default mongoose.model('User',UserSchema)