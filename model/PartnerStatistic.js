import mongoose from "mongoose";

const partnerStatisticSchema = new mongoose.Schema(
  {
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: [
      {
        date: String,
        clicks: [String],
        buys: [
          {
            date: String,
            value: Number,
            buyId: String
          }
        ],
      },
    ],
    buysMonth: {
      type: Number,
      default: 0,
    },
    buysSumMonth: {
      type: Number,
      default: 0,
    },
    clicksMonth: {
      type: Number,
      default: 0,
    },
    clicksAllPeriod: {
      type: Number,
      default: 0,
    },
    buysAllPeriod: {
      type: Number,
      default: 0,
    },
    buysSumAllPeriod: {
      type: Number,
      default: 0,
    },
    conversionAllPeriod: {
      type: Number,
      default: 0,
    },
    lastSevenDays: {
      buys: [
        {
          date: String,
          number: Number,
        },
      ],
      clicks: [
        {
          date: String,
          number: Number,
        },
      ],
      conversions: [
        {
          date: String,
          number: Number,
        },
      ],
    },
    chartsMonth: {
        buys: [
          {
            date: String,
            number: Number,
            quantity: {
              type: Number,
              default: 0
            }
          },
        ],
        clicks: [
          {
            date: String,
            number: Number,
          },
        ],
        conversions: [
          {
            date: String,
            number: Number,
          },
        ],
      },
    chartsYear: {
        buys: [
          {
            date: String,
            number: Number,
            quantity: {
              type: Number,
              default: 0
            }
          },
        ],
        clicks: [
          {
            date: String,
            number: Number,
          },
        ],
        conversions: [
          {
            date: String,
            number: Number,
          },
        ],
      },
    chartsYearAllPeriod: {
        buys: [
          {
            date: String,
            number: Number,
            quantity: {
              type: Number,
              default: 0
            }
          },
        ],
        clicks: [
          {
            date: String,
            number: Number,
          },
        ],
        conversions: [
          {
            date: String,
            number: Number,
          },
        ],
      },
  },
  { timestamps: true }
);

export default mongoose.model("PartnerStatistic", partnerStatisticSchema);
