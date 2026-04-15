import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const businessName = e.target.businessName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/food-partner/register",{
            name: businessName,
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
          <p className="auth-label">Create account</p>
          <h1>Food-partner registration</h1>
          <p className="auth-description">
            Register your kitchen and connect with hungry customers.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Business name</span>
            <input
              type="text"
              name="businessName"
              placeholder="Kitchen or restaurant name"
              autoComplete="organization"
            />
          </label>

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
              placeholder="Create a password"
              autoComplete="new-password"
            />
          </label>

          <button type="submit" className="auth-submit">
            Create account
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-row">
            <span>Already have an account?</span>
            <Link to="/food-partner/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default FoodPartnerRegister;
