// // import React, { children,createContext, useEffect, useState } from "react";

// // export const CartContext=createContext();
// // export const CartProvider=({children})=>{
// //     const[cart,setCart]=useState(()=>{
// //         const user=JSON.parse(localStorage.getItem("user"));
// //         if(user){
// //             return JSON.parse(localStorage.getItem(`cart_${user.id}`))|| []
// //         } return [];
// //     });
// //     useEffect(()=>{
// //         const user=JSON.parse(localStorage.getItem("user"));
// //         if(user){
// //             localStorage.setItem(`cart_${user.id}`,JSON.stringify(cart))
// //         }
// //     },[cart])
// //     const addCart=(product)=>{
// //         if(!cart.some((item)=>item.id===product.id)){
// //             setCart([...cart,product])
// //         }
// //     }
// //     const removeCart=(id)=>{
// //        setCart(cart.filter((item)=>item.id!==id)) 
// //     }
// //     return(
// //         <CartContext.Provider value={{cart,addCart,removeCart}}>
// //             {children}
// //         </CartContext.Provider>
// //     )
// // }
// import React, { createContext, useEffect, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
//   const [cart, setCart] = useState(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       return JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
//     }
//     return [];
//   });

//   // Load cart whenever user changes
//   useEffect(() => {
//     if (user) {
//       const savedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
//       setCart(savedCart);
//     } else {
//       setCart([]);
//     }
//   }, [user]);

//   // Save cart whenever it changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
//     }
//   }, [cart, user]);

//   const addCart = (product) => {
//     if (!cart.some((item) => item.id === product.id)) {
//       setCart([...cart,{...product,quantity:1}]);
//     }
//   };

//   const removeCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };
//   const increaseQuantity=(id)=>{
//     setCart(cart.map(item=>
//         item.id===id ? {...item,quantity:item.quantity+1}:item
//     ))
//   }
//   const decreaseQuantity=(id)=>{
//     setCart(cart.map(item=> item.id===id && item.quantity>1 ? {...item,quantity:item.quantity-1}:item))
//   }

//   const setCurrentUser = (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addCart, removeCart, user, setCurrentUser,increaseQuantity,decreaseQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Initialize cart from localStorage immediately
  const [cart, setCart] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      return JSON.parse(localStorage.getItem(`cart_${savedUser.id}`)) || [];
    }
    return [];
  });
  const navigate=useNavigate();

  // Reload cart if user changes
  useEffect(() => {
    if (user) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
      setCart(savedCart);
    } else {
      setCart([]); // clear cart if logged out
    }
  }, [user]);

  // Save cart when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [user, cart]);

  // Cart functions
  const addCart = (product) => {
    if(!user){
      alert ("please login first to add items to cart");
      navigate("/login")
      return;
      
    }
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
