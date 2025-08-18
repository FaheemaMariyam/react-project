
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

