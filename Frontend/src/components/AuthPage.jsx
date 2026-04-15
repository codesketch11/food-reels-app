import React from "react";
import { Link } from "react-router-dom";

const AuthPage = ({ heading, description, submitLabel, fields, footerLinks }) => {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="auth-label">Welcome back</p>
          <h1>{heading}</h1>
          <p className="auth-description">{description}</p>
        </div>

        <form className="auth-form">
          {fields.map((field) => (
            <label className="auth-field" key={field.name}>
              <span>{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
              />
            </label>
          ))}

          <button type="button" className="auth-submit">
            {submitLabel}
          </button>
        </form>

        {footerLinks?.length ? (
          <div className="auth-footer">
            {footerLinks.map((item) => (
              <p className="auth-footer-row" key={item.label}>
                <span>{item.text}</span>
                <Link to={item.to}>{item.label}</Link>
              </p>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default AuthPage;
