import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminEditProducts.css";
function AdminEditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [edited, setEdited] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categoryId: null,
  });

  useEffect(() => {
    axios
      .get(`https://dbrender-liu7.onrender.com/products/${id}`)
      .then((res) => setEdited(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEdited({ ...edited, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    axios
      .put(`https://dbrender-liu7.onrender.com/products/${id}`, {
        ...edited,
        price: Number(edited.price),
        stock: Number(edited.stock),
      })
      .then(() => {
        alert("Product updated successfully!");
        navigate("/admin/products");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="edit-product-page">
      <h2>Edit Product</h2>

      <form className="edit-form" onSubmit={handleEdit}>
        <label>Name</label>
        <input
          type="text"
          value={edited.name || ""}
          onChange={(e) => setEdited({ ...edited, name: e.target.value })}
        />
        <label>Description</label>
        <input
          type="text"
          value={edited.description || ""}
          onChange={(e) =>
            setEdited({ ...edited, description: e.target.value })
          }
        />
        <label>Price</label>
        <input
          type="number"
          value={edited.price || ""}
          onChange={(e) => setEdited({ ...edited, price: e.target.value })}
        />
        <label>Stock</label>
        <input
          type="number"
          value={edited.stock || ""}
          onChange={(e) => setEdited({ ...edited, stock: e.target.value })}
        />
        <label>Image</label>
        <input type="file" onChange={handleImageChange} />
        {edited.image && (
          <div style={{ margin: "10px 0" }}>
            <img
              src={edited.image}
              alt="Preview"
              style={{ width: "100px", borderRadius: "5px" }}
            />
          </div>
        )}
        <button type="submit" className="edit-btn">
          Update
        </button>
        &nbsp;
        <button
          type="button"
          className="edit-btn"
          onClick={() => navigate("/admin/products")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AdminEditProducts;
