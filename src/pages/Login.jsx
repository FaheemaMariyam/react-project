
// import React, { useContext, useState } from "react";
// import axios from "axios";
// import axiosInstance from "../APIs/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";
// import { AuthContext } from "../context/AuthContext";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
 
//   const {login}=useContext(AuthContext)
//   const[error,setError]=useState({})
//   const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //    if (!validate()) return;
  //   try {
      
      // const res = await axios.get("https://dbrender-liu7.onrender.com/users");
      // const users = res.data;

      
      // const user = users.find(
      //   (u) => u.email === email && u.password === password 
      // );
      
    
  //     if (user ) {
  //       if(user.blocked===true){
  //         alert("sorry you are blocked by Admin")
  //       }
  //       else{
  //          console.log("Login success:", user);

  //       login(user)
  //       const storedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
  //       const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];
  //       localStorage.setItem(`cart_${user.id}`, JSON.stringify(storedCart));
  //       localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(storedWishlist));
  // if(user.role==="admin"){
  //   navigate("/admin-dashboard")
  // }
  // else{
  //    navigate("/");
  // }
  //       }
       
        
       
  //     } else {
  //       alert(`Email or Password is incorrect`);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching users:", err);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };
//   const handleLogin = async (e) => {
//   e.preventDefault();
//   if (!validate()) return;

//   try {
//     const res = await axiosInstance.post("/users/login/", {
//        email: email,
//   password: password,
//     });

//     const user = res.data.user; // Make sure backend sends this key

//     // If backend didn’t find correct user
//     if (!user) {
//       alert("Invalid email or password");
//       return;
//     }

//     // Blocked user
//     if (user.blocked) {
//       alert("Sorry, you are blocked by Admin");
//       return;
//     }

//     // Login success
//     console.log("Login success:", user);
//     login(user);

//     // Initialize user-specific cart + wishlist
//     const storedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
//     const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];

//     localStorage.setItem(`cart_${user.id}`, JSON.stringify(storedCart));
//     localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(storedWishlist));

//     // Redirect
//     if (user.role === "admin") {
//       navigate("/admin-dashboard");
//     } else {
//       navigate("/");
//     }

//   } catch (err) {
//     console.error("Error fetching users:", err);
//     alert("Something went wrong. Please try again.");
//   }
// };

//   const validate=()=>{
//     const newerror={};
//     if(!email.trim()){
//       newerror.email="Email is required"
//     }
//     else if(!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)){
//       newerror.email="Enter a valid email"
//     }
//     if(!password.trim()){
//       newerror.password="Password is required"
//     }
//     else if(password.length<6){
//       newerror.password="Password must be atleast of 6 character"
//     }
//      setError(newerror);
//     return Object.keys(newerror).length === 0;
//   }
 
//   return (
//     <div className="login-wrapper">
//       <div className="login-card">
//         <h2 className="login-title">Welcome Back</h2>
//         <p className="login-subtitle">Log in to continue</p>

//         <form onSubmit={handleLogin} >
//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//              required
//             />
          
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
             
//             />
//             {error.password && <p>{error.password}</p>}
//           </div>
         

//           <button type="submit" className="submit-btn">
//             Log In
//           </button>
//         </form>

//         <p className="signup-text">
//           Don’t have an account?{" "}
//           <span
//             className="signup-link"
//             onClick={() => navigate("/signup")}
//           >
//             Sign up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../APIs/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validate = () => {
    const newerror = {};

    if (!email.trim()) newerror.email = "Email is required";
    if (!password.trim()) newerror.password = "Password is required";

    setError(newerror);
    return Object.keys(newerror).length === 0;
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const res = await axiosInstance.post("/users/login/", {
      email,
      password,
    });

    const { access, refresh, user } = res.data;

    // save tokens
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    // pass both user + tokens
    login(user, { access, refresh });

    navigate(user.role === "admin" ? "/admin-dashboard" : "/");

  } catch (err) {
    console.error(err);
    alert("Invalid email or password");
  }
};


  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p className="error">{error.email}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <p className="error">{error.password}</p>}
          </div>

          <button className="submit-btn">Log In</button>
        </form>

        <p className="signup-text">
          Don’t have an account?
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
