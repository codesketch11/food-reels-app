import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import Home from "../pages/General/Home"
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";
import Saved from "../pages/General/Saved";
import ProtectedFoodPartnerRoute from "../pages/food-partner/ProtectedFoodPartnerRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/food-partner/profile" element={<Profile />} />
        <Route path="/food-partner/profile/:id" element={<Profile />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route
          path="/create-food"
          element={
            <ProtectedFoodPartnerRoute>
              <CreateFood />
            </ProtectedFoodPartnerRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

