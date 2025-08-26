import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminAddProducts.css";
function AdminAddProducts() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",

    categoryId: 1,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const addProduct = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post("http://localhost:3000/products", newProduct)
      .then(() => {
        setNewProduct({
          name: "",
          price: "",
          description: "",
          image: "",
          stock: "",
          categoryId: 1,
        });
        navigate("/admin/products");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add product. Please try again");
      });
  };
  const categories = [
    { id: 1, name: "Cookware & Bakeware" },
    { id: 2, name: "Kitchen Appliances" },
    { id: 3, name: "Storage & Organization" },
    { id: 4, name: "Home Decor" },
    { id: 5, name: "Cleaning & Utility" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className="admin-add-product-page">
        <form className="admin-add-product-form" onSubmit={addProduct}>
          <h3>Add New Product</h3>
          <label>Product Name</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
          <label>Description</label>
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            required
          />

          <label>Price</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
          />

          <label>Stock</label>
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            required
          />

          <label>Category</label>
          <select
            value={newProduct.categoryId}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                categoryId: Number(e.target.value),
              })
            }
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label>Image</label>
          <input type="file" onChange={handleImageChange} required />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProducts;
