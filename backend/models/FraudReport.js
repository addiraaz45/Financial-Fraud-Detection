// import mongoose from "mongoose";

// const fraudReportSchema = new mongoose.Schema(
//   {
//     phoneNumber: { type: String, required: true },
//     upiId: { type: String, required: true },
//     fraudType: { type: String, required: true },
//     description: { type: String, required: true },

//     incidentDate: { type: Date, required: true },   // <-- ADD THIS
//     amount: { type: Number, default: 0 },           // <-- ADD THIS

//     status: {
//       type: String,
//       enum: ["pending", "verified", "rejected"],
//       default: "pending",
//     },

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// const FraudReport = mongoose.model("FraudReport", fraudReportSchema);

// export default FraudReport;


// 2nd


import mongoose from "mongoose";

const fraudReportSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true },
    upiId: { type: String, required: true },
    fraudType: { type: String, required: true },
    description: { type: String, required: true },
    incidentDate: { type: Date, required: true },
    amount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    severity: { type: Number, default: 1 },  // Added for risk calculation
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FraudReport = mongoose.model("FraudReport", fraudReportSchema);

export default FraudReport;