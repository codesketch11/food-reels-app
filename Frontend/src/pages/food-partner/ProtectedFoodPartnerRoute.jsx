import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedFoodPartnerRoute = ({ children }) => {
  const storedProfile = localStorage.getItem("foodPartnerProfile");

  if (!storedProfile) {
    alert("You need to login first")
    return <Navigate to="/food-partner/login" replace />;
  }

  return children;
};

export default ProtectedFoodPartnerRoute;