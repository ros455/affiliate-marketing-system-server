// import mongoose from "mongoose";

// const partnerLinkSchema = new mongoose.Schema({
//   partnerId: String,
//   link: String,
//   clicks: { type: Number, default: 0 }
// });

// const PartnerLink = mongoose.model('PartnerLink', partnerLinkSchema);

// module.exports = PartnerLink;


import mongoose from "mongoose";

const partnerLinkSchema = new mongoose.Schema({
    partnerId: String,
    link: String,
    promotionalСode: String,
    clicks: { type: [{
        date: String
    }], default: [] },
    buys: { type: [{
        date: String
    }], default: [] }
}, { timestamps: true });

export default mongoose.model('PartnerLink',partnerLinkSchema)