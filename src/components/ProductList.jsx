// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const Products = () => {
//   const location = useLocation();
//   const categoryId = new URLSearchParams(location.search).get("category");

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/products") // ✅ your db.json endpoint
//       .then((res) => res.json())
//       .then((data) => {
//         if (categoryId) {
//           const filtered = data.filter(
//             (p) => p.categoryId === Number(categoryId)
//           );
//           setProducts(filtered);
//         } else {
//           setProducts(data);
//         }
//       });
//   }, [categoryId]); // ✅ re-run when category changes

//   return (
//     <div className="products-page">
//       <h2>Products</h2>
//       <div className="products-grid">
//         {products.length > 0 ? (
//           products.map((p) => (
//             <div className="product-card" key={p.id}>
//               <img src={p.image} alt={p.name} />
//               <h3>{p.name}</h3>
//               <p>₹{p.price}</p>
//             </div>
//           ))
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;
