
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const {login}=useContext(AuthContext)
  const[error,setError]=useState({})
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
     if (!validate()) return;
    try {
      
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      
      const user = users.find(
        (u) => u.email === email && u.password === password 
      );
    
      if (user ) {
        if(user.blocked===true){
          alert("sorry you are blocked by Admin")
        }
        else{
           console.log("Login success:", user);

        login(user)
        const storedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
        const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(storedCart));
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(storedWishlist));
  if(user.role==="admin"){
    navigate("/admin-dashboard")
  }
  else{
     navigate("/");
  }
        }
       
        
       
      } else {
        alert(`Email or Password is incorrect`);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  const validate=()=>{
    const newerror={};
    if(!email.trim()){
      newerror.email="Email is required"
    }
    else if(!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)){
      newerror.email="Enter a valid email"
    }
    if(!password.trim()){
      newerror.password="Password is required"
    }
    else if(password.length<6){
      newerror.password="Password must be atleast of 6 character"
    }
     setError(newerror);
    return Object.keys(newerror).length === 0;
  }
 
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Log in to continue</p>

        <form onSubmit={handleLogin} >
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             required
            />
          
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             
            />
            {error.password && <p>{error.password}</p>}
          </div>
         

          <button type="submit" className="submit-btn">
            Log In
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
