import axiosInstance from "../../APIs/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminEditProducts.css";
import { toast } from "react-toastify";
function AdminEditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [edited, setEdited] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",   // existing Cloudinary URL OR Base64 preview
  });

  const [imageFile, setImageFile] = useState(null);

  // -----------------------------
  // LOAD PRODUCT DETAILS
  // -----------------------------
  useEffect(() => {
    axiosInstance
      .get(`/admin/products/${id}/`)
      .then((res) => {
        setEdited({
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          stock: res.data.stock,
          category: res.data.category,   // backend expects category ID
          image: res.data.image,         // Cloudinary URL
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  // -----------------------------
  // IMAGE PREVIEW + FILE SET
  // -----------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      // UI preview (same as your first code)
      const reader = new FileReader();
      reader.onloadend = () => {
        setEdited((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // -----------------------------
  // UPDATE PRODUCT
  // -----------------------------
  const handleEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", edited.name);
    formData.append("description", edited.description);
    formData.append("price", edited.price);
    formData.append("stock", edited.stock);
    formData.append("category", edited.category);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    axiosInstance
      .patch(`/admin/products/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Product updated successfully!");
        navigate("/admin/products");
      })
      .catch((err) => console.log(err));
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

        <button type="submit" className="edit-btn">Update</button>
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
