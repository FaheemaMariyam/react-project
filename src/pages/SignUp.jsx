import React, { useState } from "react";
import "./Signup.css";
import axiosInstance from "../APIs/axiosInstance";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pin: "",
    email: "",
    password1: "",
    password2: "",
    role: "user",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newerror = {};

    if (!formData.name.trim()) {
      newerror.name = "Name is required";
    } else if (formData.name.length < 3) {
      newerror.name = "Name must be at least 3 letters";
    }

    if (!formData.phone) {
      newerror.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newerror.phone = "Enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newerror.address = "Address is required";
    }

    if (!formData.pin) {
      newerror.pin = "PIN is required";
    } else if (!/^[0-9]{6}$/.test(formData.pin)) {
      newerror.pin = "Enter a valid PIN";
    }

    if (!formData.email.trim()) {
      newerror.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newerror.email = "Enter a valid email";
    }

    if (!formData.password1.trim()) {
      newerror.password1 = "Password is required";
    } else if (formData.password1.length < 6) {
      newerror.password1 = "Password must be at least 6 characters";
    }

    if (formData.password1 !== formData.password2) {
      newerror.password2 = "Passwords do not match";
    }

    setError(newerror);
    return Object.keys(newerror).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const res = await axiosInstance.post("/users/signup/", {
  name: formData.name,
  email: formData.email,
  password1: formData.password1,  
  password2: formData.password2,  
  phone: formData.phone,
  address: formData.address,
  pin: formData.pin,
  role: "user",
});



    if (res.status === 201 || res.status === 200) {
      alert("Signup successful! You can log in now.");
      navigate("/login");
    }

  } catch (err) {
  if (err.response) {
    console.log("Signup Backend Error:", err.response.data);
  } else {
    console.log("Signup Error:", err);
  }
  alert("Signup failed. Please try again.");
}

};


  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} noValidate>

          <div className={`input-group ${error.name ? "error" : ""}`}>
            <label className="input-group-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
            />
            {error.name && <p className="error">{error.name}</p>}
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

          <div className={`input-group ${error.password1 ? "error" : ""}`}>
            <label className="input-group-label">Password</label>
            <input
              type="password"
              name="password1"
              value={formData.password1}
              onChange={handleInput}
            />
          </div>

          <div className={`input-group ${error.password2 ? "error" : ""}`}>
            <label className="input-group-label">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleInput}
            />
            {error.password2 && <p className="error">{error.password2}</p>}
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
