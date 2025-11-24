import React, { useEffect, useState } from "react";
import axiosInstance from "../../APIs/axiosInstance";
import "./AdminProducts.css";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortValue, setSortValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { id: 1, name: "Cookware & Bakeware" },
    { id: 2, name: "Kitchen Appliances" },
    { id: 3, name: "Storage & Organization" },
    { id: 4, name: "Home Decor" },
    { id: 5, name: "Cleaning & Utility" },
  ];

  // ----------------------------
  // Fetch Products (Admin API)
  // ----------------------------
  const fetchProducts = () => {
    axiosInstance
      .get("/admin/products/", {
        params: {
          search: debouncedSearch || "",
          ordering: sortValue || "",
          page: pageNumber,
          category: selectedCategory || "",
        },
      })
      .then((res) => {
        setProducts(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 10));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, sortValue, selectedCategory, pageNumber]);
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
    setPageNumber(1);
  }, 400);

  return () => clearTimeout(timer);
}, [searchTerm]);

  const handleDelete = (p) => {
    axiosInstance
      .delete(`/admin/products/${p.id}/`)
      .then(() => fetchProducts())
      .catch((err) => console.error(err));
  };

  const navigate = useNavigate();

  return (
    <div className="admin-products-page">
      <h2>Admin Products</h2>

      {/* SORT + SEARCH */}
      <div className="admin-controls">
        <div className="sort-buttons">
          <button onClick={() => setSortValue("price")}>Price: Low–High</button>
          <button onClick={() => setSortValue("-price")}>Price: High–Low</button>
          <button onClick={() => setSortValue("name")}>A-Z</button>
          <button onClick={() => setSortValue("-name")}>Z-A</button>
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

      {/* CATEGORY FILTER */}
      <div className="category-buttons">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => {
            setSelectedCategory(null);
            setPageNumber(1);
          }}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={selectedCategory === cat.id ? "active" : ""}
            onClick={() => {
              setSelectedCategory(cat.id);
              setPageNumber(1);
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="admin-products-grid">
        {products.map((p) => (
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

        {products.length === 0 && <p>No products found.</p>}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>

        <span>
          Page {pageNumber} of {totalPages}
        </span>

        <button
          className="pagination-btn"
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminProducts;
