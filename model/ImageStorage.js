import mongoose from "mongoose";

const ImageStorageSchema = new mongoose.Schema({
    BigBanner: String,
    MiddleBanner: String,
    SmallBanner: String
}, { timestamps: true });

export default mongoose.model('ImageStorage',ImageStorageSchema)