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

  const navigate = useNavigate();

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
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageNumber(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, sortValue, selectedCategory, pageNumber]);

  const handleDelete = (p) => {
    axiosInstance
      .delete(`/admin/products/${p.id}/`)
      .then(() => fetchProducts())
      .catch((err) => console.error(err));
  };

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
          Add Product
        </button>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTER */}
      <div className="admin-category-buttons">
  <button className={!selectedCategory ? "active" : ""}>All</button>
  {categories.map((cat) => (
    <button
      key={cat.id}
      className={selectedCategory === cat.id ? "active" : ""}
    >
      {cat.name}
    </button>
  ))}
</div>


      {/* PRODUCT TABLE */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name & Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} className="product-img" />
                </td>
                <td>
                  <strong>{p.name}</strong>
                  <p>{p.description}</p>
                </td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/edit-products/${p.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
