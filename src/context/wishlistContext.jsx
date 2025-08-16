// import React, { Children, createContext, useEffect, useState } from "react";
// export const WishlistContext=createContext();
// export const WishlistProvider=({children})=>{
//     const[user,setUser]=useState(()=>JSON.parse(localStorage.getItem("user")))
//     const[wishlist,setWishlist]=useState(()=>{
//         const user=JSON.parse(localStorage.getItem("user"))
//         if(user){
//            return JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || []
//         }
//         return []
//     })
//     useEffect(()=>{
//         if(user){
//             const savedWishlist=JSON.parse(localStorage.getItem(`wishlist_${user.id}`))||[];
//             setWishlist(savedWishlist)
//         }
//         else{
//             setWishlist([])
//         }
//     },[user])
//     useEffect(()=>{
//         if(user){
//             localStorage.setItem(`wishlist_${user.id}`,JSON.stringify(wishlist))
//         }
//     },[user,wishlist])
//     const setCurrentUser=(userdata)=>{
//         localStorage.setItem("user",JSON.stringify(userdata))
//         setUser(userdata)
//     }
//     const addWishlist=(product)=>{
//         if(!wishlist.some((item)=>item.id===product.id)){
//             setWishlist([...wishlist,product])
//         }

//     }
//     const removeWishlist=(id)=>{
//   setWishlist(wishlist.filter((item)=>item.id!==id))
//     }
//     return(
//     <WishlistContext.Provider value={{wishlist,addWishlist,removeWishlist,user,setCurrentUser}}>
//         {children}
//     </WishlistContext.Provider>
// )
// }
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
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
    const addWishlist=(product)=>{
        if(!wishlist.some((item)=>item.id===product.id)){
            setWishlist([...wishlist,product])
        }

    }
    const removeWishlist=(id)=>{
  setWishlist(wishlist.filter((item)=>item.id!==id))
    }
    return(
        <WishlistContext.Provider value={{wishlist,addWishlist,removeWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}