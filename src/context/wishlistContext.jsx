
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
export const WishlistContext=createContext();
export const WishlistProvider=({children})=>{
    const {user}=useContext(AuthContext);
    const[wishlist,setWishlist]=useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      return JSON.parse(localStorage.getItem(`wishlist_${savedUser.id}`)) || [];
    }
    return [];
  });
  const navigate=useNavigate();
    useEffect(()=>{
        if(user){
            const savedWishlist=JSON.parse(localStorage.getItem(`wishlist_${user.id}`))||[];
            setWishlist(savedWishlist)

        }
        else{
            setWishlist([])
        }
    },[user]);

    useEffect(()=>{
        if(user){
            localStorage.setItem(`wishlist_${user.id}`,JSON.stringify(wishlist))
        }
    },[user,wishlist])
    const toggleWishlist=(product)=>{
        if(!user){
            alert("Please login first to add wishlist items");
            navigate("/login");
            return;
        }
        if(user.role==="admin"){
            return
        }
        if(wishlist.some((item)=>item.id===product.id)){
            setWishlist(wishlist.filter((item)=>item.id!==product.id))
          
        }
        else{
              setWishlist([...wishlist,product])
        }

    }
    
    const removeWishlist=(id)=>{
  setWishlist(wishlist.filter((item)=>item.id!==id))
    }
    return(
        <WishlistContext.Provider value={{wishlist,toggleWishlist,removeWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}