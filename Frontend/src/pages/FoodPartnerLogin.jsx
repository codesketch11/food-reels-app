import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/food-partner/login",{
            email,
            password
        },{
            withCredentials: true
        })

        localStorage.setItem("foodPartnerProfile", JSON.stringify(response.data.foodPartner));

        navigate(`/food-partner/profile/${response.data.foodPartner._id}`)
    }


  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="auth-label">Welcome back</p>
          <h1>Food-partner login</h1>
          <p className="auth-description">
            Sign in to manage your menu and orders.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              placeholder="hello@example.com"
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              autoComplete="current-password"
            />
          </label>

          <button type="submit" className="auth-submit">
            Sign in
          </button>
        </form>
    
        <div className="auth-footer">
          <p className="auth-footer-row">
            <span>New here?</span>
            <Link to="/user/register">Register as normal user</Link>
          </p>
          <p className="auth-footer-row">
            <span>Partner ready?</span>
            <Link to="/food-partner/register">Register as food-partner</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default FoodPartnerLogin;
