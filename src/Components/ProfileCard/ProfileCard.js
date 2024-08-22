// src/Components/ProfileCard/ProfileCard.js
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import './ProfileCard.css';

const ProfileCard = ({ isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [view, setView] = useState("profile");

  const navigate = useNavigate();
  const popupRef = useRef(null);

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email,
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      if (!authtoken || !email) {
        navigate("/login");
        return;
      }
      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert(`Profile Updated Successfully!`);
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewChange = (view) => {
    if (view === "reports") {
      navigate("/reports"); // Redirect to ReportsLayout
      onClose(); // Close the profile card
    } else {
      setView(view);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={popupRef} className="profile-popup">
      <div className="profile-navigation">
        <a href="#profile" onClick={() => handleViewChange("profile")} className="profile-link">Your Profile</a>
        <a href="#reports" onClick={() => handleViewChange("reports")} className="profile-link">Your Reports</a>
      </div>
      
      {view === "profile" && (
        <div className="profile-section">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  disabled
                />
              </label>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={updatedDetails.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone
                <input
                  type="text"
                  name="phone"
                  value={updatedDetails.phone}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save</button>
            </form>
          ) : (
            <div className="profile-details">
              <h1>Welcome, {userDetails.name}</h1>
              <p><b>Email:</b> {userDetails.email}</p>
              <p><b>Phone:</b> {userDetails.phone}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;