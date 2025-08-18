import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    pin: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newerror = {};

    if (!formData.username.trim()) {
      newerror.username = "Name is required";
    } else if (formData.username.length < 3) {
      newerror.username = "Name at least of 3 Letters";
    }

    if (!formData.phone) {
      newerror.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newerror.phone = "Enter a valid Phone number";
    }

    if (!formData.address.trim()) {
      newerror.address = "Address is required";
    }

    if (!formData.pin) {
      newerror.pin = "Pin number is required";
    } else if (!/^[0-9]{6}$/.test(formData.pin)) {
      newerror.pin = "Enter a valid pin number";
    }

    if (!formData.email.trim()) {
      newerror.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newerror.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newerror.password = "Password is required";
    } else if (formData.password.length < 6) {
      newerror.password = "Password must be at least of 6 characters";
    }

    setError(newerror);
    return Object.keys(newerror).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:3000/users", formData);
      if (res.status === 201 || res.status === 200) {
        alert("Signup successful, you can log in now");
        navigate("/login");
      } else {
        alert("Signup failed, please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} noValidate>
        
          <div className={`input-group ${error.username ? "error" : ""}`}>
            <label className="input-group-label">Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInput}
            />
            {error.username && <p className="error">{error.username}</p>}
          </div>

         
          <div className={`input-group ${error.phone ? "error" : ""}`}>
            <label className="input-group-label">Phone Number</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInput}
            />
            {error.phone && <p className="error">{error.phone}</p>}
          </div>

      
          <div className={`input-group ${error.address ? "error" : ""}`}>
            <label className="input-group-label">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInput}
            />
            {error.address && <p className="error">{error.address}</p>}
          </div>

          
          <div className={`input-group ${error.pin ? "error" : ""}`}>
            <label className="input-group-label">PIN</label>
            <input
              type="number"
              name="pin"
              value={formData.pin}
              onChange={handleInput}
            />
            {error.pin && <p className="error">{error.pin}</p>}
          </div>

          <div className={`input-group ${error.email ? "error" : ""}`}>
            <label className="input-group-label">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInput}
            />
            {error.email && <p className="error">{error.email}</p>}
          </div>

        
          <div className={`input-group ${error.password ? "error" : ""}`}>
            <label className="input-group-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
            />
            {error.password && <p className="error">{error.password}</p>}
          </div>

         
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
