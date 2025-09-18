import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProducts.css";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: "Cookware & Bakeware" },
    { id: 2, name: "Kitchen Appliances" },
    { id: 3, name: "Storage & Organization" },
    { id: 4, name: "Home Decor" },
    { id: 5, name: "Cleaning & Utility" },
  ];

  useEffect(() => {
    axios
      .get("https://dbrender-liu7.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (p) => {
    axios
      .delete(`https://dbrender-liu7.onrender.com/products/${p.id}`)
      .then(() => setProducts(products.filter((pro) => pro.id !== p.id)))
      .catch((err) => console.error(err));
  };
  const navigate = useNavigate();
  const filteredProducts = products
    .filter(
      (p) => !selectedCategory || p.categoryId === Number(selectedCategory)
    )
    .filter((p) =>
      `${p.name}${p.description}${p.price}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const sortByPriceLowHigh = () =>
    setProducts([...products].sort((a, b) => a.price - b.price));
  const sortByPriceHighLow = () =>
    setProducts([...products].sort((a, b) => b.price - a.price));
  const sortByAtoZ = () =>
    setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
  const sortByZtoA = () =>
    setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));

  return (
    <div className="admin-products-page">
      <h2>Admin Products</h2>

      <div className="admin-controls">
        <div className="sort-buttons">
          <button onClick={sortByPriceLowHigh}>Price: Low–High</button>
          <button onClick={sortByPriceHighLow}>Price: High–Low</button>
          <button onClick={sortByAtoZ}>A-Z</button>
          <button onClick={sortByZtoA}>Z-A</button>
        </div>
        <button
          className="edit-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          Addproduct
        </button>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="category-buttons">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={selectedCategory === cat.id ? "active" : ""}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="admin-products-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="admin-product-card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
            <button
              className="edit-btn"
              onClick={() => navigate(`/admin/edit-products/${p.id}`)}
            >
              Edit
            </button>
            &nbsp;&nbsp;&nbsp;
            <button className="edit-btn" onClick={() => handleDelete(p)}>
              Delete
            </button>
          </div>
        ))}
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}

export default AdminProducts;
