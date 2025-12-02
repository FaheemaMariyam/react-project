import React, { useEffect, useState } from "react";
import axiosInstance from "../../APIs/axiosInstance";
// import "./AdminCategories.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [updatedCategories, setUpdatedCategories] = useState({}); // stores changes temporarily

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

  // Handle input change locally
  const handleNameChange = (id, newName) => {
    setUpdatedCategories((prev) => ({
      ...prev,
      [id]: { ...prev[id], name: newName },
    }));
  };

  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    if (!file) return;

    setUpdatedCategories((prev) => ({
      ...prev,
      [id]: { ...prev[id], image: file },
    }));
  };

  // Submit all changes at once
  const handleSubmit = () => {
    const updatePromises = Object.keys(updatedCategories).map((id) => {
      const data = updatedCategories[id];
      const formData = new FormData();

      if (data.name) formData.append("name", data.name);
      if (data.image) formData.append("image", data.image);

      return axiosInstance.patch(`/admin/categories/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        alert("All updates submitted!");
        setUpdatedCategories({});
        fetchCategories(); // refresh categories
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
                  onChange={(e) => handleNameChange(cat.id, e.target.value)}
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

      {/* Submit button */}
      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Submit Changes
      </button>
    </div>
  );
}

export default AdminCategories;
