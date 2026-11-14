import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function handleSubmit(event) {
  event.preventDefault();

  try {
    console.log("Login started");

    const response = await fetch("https://eshop-mall.onrender.com/api/auth/login",
{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log("Response status:", response.status);

    const data = await response.json();

    console.log("Login response:", data);

    if (!response.ok) {
      console.log("Login error:", data);
      alert(data.message || "Login failed");   
      return;

    }

    localStorage.setItem("token", data.token);

    alert("Login successful! Welcome to E-Shop Mall.");

    window.location.href = "/";

  } catch (error) {   
    console.error("Actual login error:" ,error);

    alert("Login error: " + error.message);
  }

}
  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome Back!</h1>
        <p>Login to your E-Shop Mall account.</p>

        <label htmlFor="login-email">Email Address</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="auth-submit">
          Login
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <Link className="back-home" to="/">← Back to shopping</Link>
      </form>
    </main>
  );
}

export default Login;