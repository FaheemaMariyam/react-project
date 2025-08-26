import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
const[user,setUser]=useState(()=>{
    const savedUser=localStorage.getItem("user")
    return savedUser? JSON.parse(savedUser): null;
})

const login=(userData)=>{
    toast.success("Welcome")
setUser(userData);
localStorage.setItem("user",JSON.stringify(userData))
}
const logout=()=>{
//    const confirm= window.confirm("Do you want to logout")
//    if(confirm){
//      setUser(null);
//     localStorage.removeItem("user")
   
//     return true
    
    
//    }
//    return false;
 
  setUser(null);
  localStorage.removeItem("user");
   toast.success("Logout Successfully")
//   window.alert("You have been logged out successfully!");
  return true;


   
   
}
return(
    <AuthContext.Provider value={{user,setUser,login,logout}}>
        {children}
    </AuthContext.Provider>
)
}