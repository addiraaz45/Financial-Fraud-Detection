// import mongoose from "mongoose";

// const adminLogSchema = new mongoose.Schema(
//   {
//     admin: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     action: {
//       type: String,
//       enum: ["verified", "rejected", "deleted"],
//       required: true,
//     },
//     fraudReportId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "FraudReport",
//     },
//     description: String,
//   },
//   { timestamps: true }
// );

// const AdminLog = mongoose.model("AdminLog", adminLogSchema);
// export default AdminLog;


// 2nd

import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: { type: String, required: true },  // e.g., "verified", "deleted"
  fraudReportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FraudReport",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const AdminLog = mongoose.model("AdminLog", adminLogSchema);

export default AdminLog;