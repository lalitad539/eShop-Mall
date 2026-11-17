import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://eshop-mall.onrender.com/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load profile");
        }

        setUser(data.user);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <h2>Loading your profile...</h2>;
  }

  if (error) {
    return (
      <div className="profile-container">
        <h2>Profile Error</h2>
        <p>{error}</p>
        <button onClick={handleLogout}>Login Again</button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h1>My Account</h1>
        <p>Welcome to your E-Shop Mall profile!</p>

        <div className="profile-details">
          <h3>Personal Information</h3>

          <p><strong>Full Name:</strong> {user.name}</p>

          <p><strong>Email:</strong> {user.email}</p>

          <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>

          <p>
            <strong>Member Since:</strong>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Not available"}
          </p>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;