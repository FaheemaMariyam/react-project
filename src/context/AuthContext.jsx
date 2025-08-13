import React, { createContext, useEffect, useState } from "react";
export const AuthContext=createContext();
export function AuthProvider({children}){
const[user,setUser]=useState(null)
useEffect(()=>{
    const storedUser=localStorage.getItem("user")
    if(storedUser) setUser(JSON.parse(storedUser))
    

},[])
useEffect(()=>{
    if(user) localStorage.setItem("user",JSON.stringify(user));
        else localStorage.removeItem("user")
},[user]);
const login=(userData)=>setUser(userData);
const logout=()=>setUser("");
const signup=(userData)=>setUser(userData);
return(
    <AuthContext.Provider value={{user,login,logout,signup}}>
        {children}
    </AuthContext.Provider>
)
}