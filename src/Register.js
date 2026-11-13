import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await fetch(
      "https://eshop-mall.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed!");
      return;
    }

    alert("Account created successfully! Please login.");

    setName("");
    setEmail("");
    setPassword("");

  } catch (error) {
    console.error("Registration error:", error);
    alert("Cannot connect to backend. Please try again.");
  }
}
  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Join E-Shop Mall and start shopping.</p>

        <label htmlFor="register-name">Full Name</label>
        
        <input
          id="register-name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="register-email">Email Address</label>
        <input
          id="register-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          placeholder="Create a password (minimum 8 characters)"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="auth-submit">
          Create Account
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
        <Link className="back-home" to="/">← Back to shopping</Link>
      </form>
    </main>
  );
}

export default Register;