import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user/register`, {
      fullName: firstName + " " + lastName,
      email,
      password,
    },{
        withCredentials: true
    });

    navigate("/")
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="auth-label">Create account</p>
          <h1>User registration</h1>
          <p className="auth-description">
            Sign up to order from your favorite food partners.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>First name</span>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              autoComplete="given-name"
            />
          </label>

          <label className="auth-field">
            <span>Last name</span>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              autoComplete="family-name"
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
            <Link to="/user/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default UserRegister;
