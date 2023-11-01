import mongoose from "mongoose";

const partnerStatisticSchema = new mongoose.Schema({
    partnerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    event: [
        {
            date: String,
            clicks: [String],
            buys: [String],
        }
    ],
    buysMonth: {
        type:Number,
        default: 0
    },
    clicksMonth: {
        type:Number,
        default: 0
    },
    clicksAllPeriod: {
        type:Number,
        default: 0
    },
    buysAllPeriod: {
        type:Number,
        default: 0
    },
    chartsMonth: {
        buys: [
            {
                date:{
                    type:String,
                    default: ''
                },
                number: {
                    type: Number,
                    default: 0,
                }
            }
        ],
        clicks: [
            {
                date:{
                    type:String,
                    default: ''
                },
                number: {
                    type: Number,
                    default: 0,
                }
            }
        ],
        conversions: [
            {
                date:{
                    type:String,
                    default: ''
                },
                number: {
                    type: Number,
                    default: 0,
                }
            }
        ]
    }
}, { timestamps: true });

export default mongoose.model('PartnerStatistic',partnerStatisticSchema)