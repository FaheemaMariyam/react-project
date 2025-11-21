
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Categories.css";
import axiosInstance from "../APIs/axiosInstance";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories/");
      const data = res.data;

      // If paginated → use results, else use full array
      setCategories(data.results || data);
    } catch (err) {
      console.log("Error fetching categories:", err);
      setCategories([]); // prevent map crash
    }
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

