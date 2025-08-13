import React, { useState } from "react";
import "./Signup.css"; // separate CSS file
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

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/users", formData);
    console.log("Signup response status:", res.status);
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
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInput}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInput}
              required
            />
          </div>

          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInput}
              required
            />
          </div>

          <div className="input-group">
            <label>PIN</label>
            <input
              type="number"
              name="pin"
              value={formData.pin}
              onChange={handleInput}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              required
            />
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
// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// function Signup() {
//   const [formData, setFormData] = useState({
//     username: "",
//     phone: "",
//     address: "",
//     pin: "",
//     email: "",
//     password: ""
//   });

//   const navigate = useNavigate();

//   // Get signup function from context
//   const { signup } = useContext(AuthContext);

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/users", formData);
//       if (res.status === 201) {
//         // Call signup from context to set global user state
//         signup(res.data); // res.data is the created user from backend
//         // Navigate to home or profile page
//         navigate("/");
//       } else {
//         alert("Signup failed, please try again.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong, please try again later");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <h2>Create an Account</h2>
//         <form onSubmit={handleSubmit}>
//           {/* input fields here */}
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleInput}
//             required
//           />
//           {/* Add other fields similarly */}
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;
