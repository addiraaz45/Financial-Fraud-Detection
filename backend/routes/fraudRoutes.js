// import express from "express";
// import {
//   reportFraud,
//   searchFraud,
//   getAllFraudReports,
//   getUserReports,
//   deleteFraudReport,
//   verifyFraudReport,
//   getFraudAnalytics,
// } from "../controllers/fraudController.js";

// import { protect, authorize } from "../middlewares/auth.js";

// const router = express.Router();

// // Public route
// router.get("/search", searchFraud);

// // User routes
// router.post("/report", protect, reportFraud);
// router.get("/user/reports", protect, getUserReports);

// // Admin routes
// router.get("/all", protect, authorize("admin"), getAllFraudReports);
// router.delete("/:id", protect, authorize("admin"), deleteFraudReport);
// router.put("/verify/:id", protect, authorize("admin"), verifyFraudReport);
// router.get("/analytics/data", protect, authorize("admin"), getFraudAnalytics);

// // ESM default export
// export default router;


// 2nd

import express from "express";
import {
  reportFraud,
  searchFraud,
  getAllFraudReports,
  getUserReports,
  deleteFraudReport,
  verifyFraudReport,
  getFraudAnalytics,
} from "../controllers/fraudController.js";

import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// Public route
router.get("/search", searchFraud);

// User routes
router.post("/report", protect, reportFraud);
router.get("/user/reports", protect, getUserReports);

// Admin routes
router.get("/all", protect, authorize("admin"), getAllFraudReports);
router.delete("/:id", protect, authorize("admin"), deleteFraudReport);
router.put("/verify/:id", protect, authorize("admin"), verifyFraudReport);
router.get("/analytics/data", protect, authorize("admin"), getFraudAnalytics);

// ESM default export
export default router;