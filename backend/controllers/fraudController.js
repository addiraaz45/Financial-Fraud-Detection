import FraudReport from "../models/FraudReport.js";
import AdminLog from "../models/AdminLog.js";
import {
  calculateRiskScore,
  getRiskLevel,
  getRiskColor,
} from "../utils/riskScore.js";

// ===============================
// Report Fraud
// ===============================
export const reportFraud = async (req, res) => {
  try {
    const { phone, upiId, fraudType, description, incidentDate, amount } =
      req.body;
    const userId = req.user.id;

    if (!phone || !upiId || !fraudType || !description || !incidentDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingReport = await FraudReport.findOne({
      phoneNumber: phone,
      upiId,
      user: userId,
    });

    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: "You already reported this phone/UPI",
      });
    }

    const fraudReport = await FraudReport.create({
      phoneNumber: phone,
      upiId,
      fraudType,
      description,
      incidentDate,
      amount: amount || 0,
      user: userId,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Fraud report submitted successfully",
      data: fraudReport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// Search Fraud (Public)
// ===============================
// export const searchFraud = async (req, res) => {
//   try {
//     const { phone, upi } = req.query;

//     if (!phone && !upi) {
//       return res.status(400).json({
//         success: false,
//         message: "Provide phone or UPI ID",
//       });
//     }

//     let query = { status: "verified" };

//     if (phone) query.phoneNumber = phone;
//     if (upi) query.upiId = upi.toLowerCase();

//     const reports = await FraudReport.find(query).populate(
//       "user",
//       "name email"
//     );

//     const totalComplaints = reports.length;

//     const avgSeverity =
//       totalComplaints > 0
//         ? reports.reduce((sum, r) => sum + (r.severity || 1), 0) /
//           totalComplaints
//         : 1;

//     const riskScore = calculateRiskScore(totalComplaints, avgSeverity);
//     const riskLevel = getRiskLevel(riskScore);
//     const riskColor = getRiskColor(riskScore);

//     // Determine scam or safe based on risk level
//     const scamSafe = riskLevel === "High" ? "scam" : "safe";

//     res.status(200).json({
//       success: true,
//       data: {
//         phone: phone || null,
//         upi: upi || null,
//         totalComplaints,
//         riskScore,
//         riskLevel,
//         riskColor,
//         scamSafe,  // Added: "scam" if high risk, "safe" otherwise
//         reports: reports.slice(0, 5),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const searchFraud = async (req, res) => {
  try {
    const { phone, upi } = req.query;

    if (!phone && !upi) {
      return res.status(400).json({
        success: false,
        message: "Please enter phone or UPI ID",
      });
    }

    // FIND MATCHING REPORTS
    const reports = await FraudReport.find({
      $or: [phone ? { phoneNumber: phone } : {}, upi ? { upiId: upi } : {}],
    }).sort({ createdAt: -1 });

    const totalComplaints = reports.length;

    // Case 1: No fraud reports found = SAFE
    if (totalComplaints === 0) {
      return res.json({
        success: true,
        data: {
          scamSafe: "safe",
          riskScore: 0,
          riskLevel: "No Risk",
          totalComplaints: 0,
          phone,
          upi,
          reports: [],
        },
      });
    }

    // Case 2: Fraud reports found = SCAM
    let riskScore = 0;
    if (totalComplaints === 1) riskScore = 2;
    else if (totalComplaints <= 3) riskScore = 4;
    else if (totalComplaints <= 5) riskScore = 6;
    else riskScore = 9;

    const riskLevel =
      riskScore <= 1
        ? "Very Low Risk"
        : riskScore <= 3
        ? "Low Risk"
        : riskScore <= 5
        ? "Medium Risk"
        : riskScore <= 7
        ? "High Risk"
        : "Extreme Risk";

    return res.json({
      success: true,
      data: {
        scamSafe: "scam",
        riskScore,
        riskLevel,
        totalComplaints,
        phone,
        upi,
        reports,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get All Reports (Admin)
// ===============================
export const getAllFraudReports = async (req, res) => {
  try {
    const { status, sortBy } = req.query;

    let query = {};
    if (status) query.status = status;

    let sort = { createdAt: -1 };
    if (sortBy === "severity") sort = { severity: -1 };

    const reports = await FraudReport.find(query)
      .populate("user", "name email")
      .sort(sort);

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// Get User Reports
// ===============================
export const getUserReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const reports = await FraudReport.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// Delete Fraud Report (Admin)
// ===============================
export const deleteFraudReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await FraudReport.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await AdminLog.create({
      admin: req.user.id,
      action: "deleted",
      fraudReportId: id,
    });

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// Verify Fraud Report (Admin)
// ===============================
export const verifyFraudReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, severity } = req.body;

    if (!status || !["verified", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const report = await FraudReport.findByIdAndUpdate(
      id,
      {
        status,
        severity: severity || 1,
      },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await AdminLog.create({
      admin: req.user.id,
      action: status === "verified" ? "verified" : "rejected",
      fraudReportId: id,
    });

    res.status(200).json({
      success: true,
      message: `Report ${status} successfully`,
      data: report,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// Fraud Analytics (Admin)
// ===============================
export const getFraudAnalytics = async (req, res) => {
  try {
    const totalReports = await FraudReport.countDocuments();
    const verifiedReports = await FraudReport.countDocuments({
      status: "verified",
    });
    const pendingReports = await FraudReport.countDocuments({
      status: "pending",
    });

    const topPhones = await FraudReport.aggregate([
      { $match: { status: "verified" } },
      { $group: { _id: "$phoneNumber", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const topUPIs = await FraudReport.aggregate([
      { $match: { status: "verified" } },
      { $group: { _id: "$upiId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const fraudTypes = await FraudReport.aggregate([
      { $match: { status: "verified" } },
      { $group: { _id: "$fraudType", count: { $sum: 1 } } },
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyReports = await FraudReport.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          status: "verified",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalReports,
        verifiedReports,
        pendingReports,
        topPhones,
        topUPIs,
        fraudTypes,
        dailyReports,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
