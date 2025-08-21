import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
const[user,setUser]=useState(()=>{
    const savedUser=localStorage.getItem("user")
    return savedUser? JSON.parse(savedUser): null;
})

const login=(userData)=>{
setUser(userData);
localStorage.setItem("user",JSON.stringify(userData))
}
const logout=()=>{
   const confirm= window.confirm("Do you want to logout")
   if(confirm){
     setUser(null);
    localStorage.removeItem("user")
   
    return true
    
    
   }
   return false;
   
   
}
return(
    <AuthContext.Provider value={{user,setUser,login,logout}}>
        {children}
    </AuthContext.Provider>
)
}