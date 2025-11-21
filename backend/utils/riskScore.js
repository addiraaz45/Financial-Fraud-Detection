// export const calculateRiskScore = (complaintCount, avgSeverity = 1) => {
//   const score = complaintCount * avgSeverity;
//   return score;
// };

// export const getRiskLevel = (score) => {
//   if (score === 0) return "Safe";
//   if (score <= 1) return "Low Risk";
//   if (score <= 3) return "Suspicious";
//   if (score <= 5) return "High Risk";
//   return "Highly Fraudulent";
// };

// export const getRiskColor = (score) => {
//   if (score === 0) return "#22c55e"; 
//   if (score <= 1) return "#84cc16"; 
//   if (score <= 3) return "#eab308"; 
//   if (score <= 5) return "#f97316"; 
//   return "#ef4444"; 
// };


// 2nd



// Simple risk score calculation (customize as needed)
export const calculateRiskScore = (totalComplaints, avgSeverity) => {
  // Example: Higher complaints and severity increase risk
  return totalComplaints * avgSeverity * 10;  // Scale to 0-100 or more
};

export const getRiskLevel = (riskScore) => {
  if (riskScore >= 50) return "High";
  if (riskScore >= 20) return "Medium";
  return "Low";
};

export const getRiskColor = (riskScore) => {
  if (riskScore >= 50) return "red";
  if (riskScore >= 20) return "yellow";
  return "green";
};