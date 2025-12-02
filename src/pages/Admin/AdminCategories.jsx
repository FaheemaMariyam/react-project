import React, { useEffect, useState } from "react";
import axiosInstance from "../../APIs/axiosInstance";
import "./AdminCategories.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axiosInstance
      .get("/categories/")
      .then((res) => {
        setCategories(res.data.results || res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    axiosInstance
      .patch(`/admin/categories/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Image updated");
        fetchCategories();
      })
      .catch((err) => console.error(err));
  };

  const handleNameChange = (id, newName) => {
    axiosInstance
      .patch(`/admin/categories/${id}/`, { name: newName })
      .then(() => {
        alert("Category name updated");
        fetchCategories();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-categories-page">
      <h2>Admin Categories</h2>

      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Category Name</th>
            <th>Upload New Image</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>
                <img src={cat.image} alt={cat.name} className="cat-img" />
              </td>

              <td>
                <input
                  type="text"
                  defaultValue={cat.name}
                  onBlur={(e) => handleNameChange(cat.id, e.target.value)}
                />
              </td>

              <td>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, cat.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCategories;
