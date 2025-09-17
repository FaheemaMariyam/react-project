
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import { useNavigate } from "react-router-dom";
// export const WishlistContext=createContext();
// export const WishlistProvider=({children})=>{
//     const {user}=useContext(AuthContext);
//     const[wishlist,setWishlist]=useState(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     if (savedUser) {
//       return JSON.parse(localStorage.getItem(`wishlist_${savedUser.id}`)) || [];
//     }
//     return [];
//   });
//   const navigate=useNavigate();
//     useEffect(()=>{
//         if(user){
//             const savedWishlist=JSON.parse(localStorage.getItem(`wishlist_${user.id}`))||[];
//             setWishlist(savedWishlist)

//         }
//         else{
//             setWishlist([])
//         }
//     },[user]);

//     useEffect(()=>{
//         if(user){
//             localStorage.setItem(`wishlist_${user.id}`,JSON.stringify(wishlist))
//         }
//     },[user,wishlist])
//     const toggleWishlist=(product)=>{
//         if(!user){
//             alert("Please login first to add wishlist items");
//             navigate("/login");
//             return;
//         }
//         if(user.role==="admin"){
//             return
//         }
//         if(wishlist.some((item)=>item.id===product.id)){
//             setWishlist(wishlist.filter((item)=>item.id!==product.id))
          
//         }
//         else{
//               setWishlist([...wishlist,product])
//         }

//     }
    
//     const removeWishlist=(id)=>{
//   setWishlist(wishlist.filter((item)=>item.id!==id))
//     }
//     return(
//         <WishlistContext.Provider value={{wishlist,toggleWishlist,removeWishlist}}>
//             {children}
//         </WishlistContext.Provider>
//     )
// }
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import {
  addWishlistToDB,
  getUserWishlist,
  removeWishlistFromDB,
  clearWishlistFromDB
} from "../APIs/WishlistApi";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Load wishlist from DB
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const res = await getUserWishlist(user.id);
        setWishlist(res.data);
      } else {
        setWishlist([]);
      }
      setLoading(false);
    };
    fetchWishlist();
  }, [user]);

  // Add or toggle wishlist item
  const toggleWishlist = async (product) => {
    if (!user) {
      alert("Please login first to add wishlist items");
      navigate("/login");
      return;
    }
    if (user.role === "admin") return;

    const existing = wishlist.find((item) => item.id === product.id);
    if (existing) {
      // Remove if exists
      await removeWishlistFromDB(existing.id);
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      // Add if not exists
      const newItem = { ...product, userId: user.id };
      const res = await addWishlistToDB(newItem);
      setWishlist([...wishlist, res.data]);
    }
  };

  // Remove single item
  const removeWishlist = async (id) => {
    await removeWishlistFromDB(id);
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  // Clear entire wishlist
  const clearWishlist = async () => {
    if (user) {
      await clearWishlistFromDB(user.id);
      setWishlist([]);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeWishlist, clearWishlist, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
