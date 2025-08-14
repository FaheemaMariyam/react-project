// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Categories.css";

// const categories = [
//   { id: 1, name: "Cookware & Bakeware", image: "/products/cookcg.jpg" },
//   { id: 2, name: "Kitchen Appliances", image: "/products/kitchencg.jpg" },
//   { id: 3, name: "Storage & Organization", image: "/products/cookware.jpg" },
//   { id: 4, name: "Home Decor", image: "/products/shelves.jpg" },
//   { id: 5, name: "Cleaning & Utility", image: "/products/cleaningcg.jpg" }
// ];

// const Categories = () => {
//   const navigate = useNavigate();
//   const handleClick = (id) => navigate(`/products?category=${id}`);

//   return (
//     <section className="categories-section">
//       <h2 className="section-title">Featured Categories</h2>
//       <div className="categories-grid">
//         {categories.map((cat) => (
//           <div
//             className="category-card"
//             key={cat.id}
//             onClick={() => handleClick(cat.id)}
//             style={{ cursor: "pointer" }}
//           >
//             <img src={cat.image} alt={cat.name} />
//             <h3>{cat.name}</h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Categories;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleClick = (id) => navigate(`/products?category=${id}`);

  return (
    <section className="categories-section">
      <h2 className="section-title">Featured Categories</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            className="category-card"
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;

