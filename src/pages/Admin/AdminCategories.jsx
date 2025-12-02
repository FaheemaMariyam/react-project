import React, { useEffect, useState } from "react";
import axiosInstance from "../../APIs/axiosInstance";
import imageCompression from "browser-image-compression";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [updatedCategories, setUpdatedCategories] = useState({}); // temporary changes

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from backend
  const fetchCategories = () => {
    axiosInstance
      .get("/categories/")
      .then((res) => {
        setCategories(res.data.results || res.data);
      })
      .catch((err) => console.error("Fetch categories error:", err));
  };

  // Handle name change
  const handleNameChange = (id, newName) => {
    setUpdatedCategories((prev) => ({
      ...prev,
      [id]: { ...prev[id], name: newName },
    }));
  };

  // Handle image selection & compression
  const handleImageChange = async (event, id) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 2,           // max 2MB after compression
        maxWidthOrHeight: 1024, // resize if larger
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      if (compressedFile.size / 1024 / 1024 > 2) {
        alert("Image too large after compression. Choose a smaller image.");
        return;
      }

      setUpdatedCategories((prev) => ({
        ...prev,
        [id]: { ...prev[id], image: compressedFile },
      }));
    } catch (error) {
      console.error("Image compression error:", error);
      alert("Failed to compress image. Try a smaller file.");
    }
  };

  // Submit changes
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
        alert("All updates submitted successfully!");
        setUpdatedCategories({});
        fetchCategories();
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to submit some updates. Check console.");
      });
  };

  return (
    <div className="admin-categories-page">
      <h2>Admin Categories</h2>

      <table className="category-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Category Name</th>
            <th>Upload New Image</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>
                <img
                  src={
                    updatedCategories[cat.id]?.image
                      ? URL.createObjectURL(updatedCategories[cat.id].image)
                      : cat.image
                  }
                  alt={cat.name}
                  className="cat-img"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </td>

              <td>
                <input
                  type="text"
                  defaultValue={cat.name}
                  onChange={(e) => handleNameChange(cat.id, e.target.value)}
                  style={{ padding: "5px", width: "200px" }}
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

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Submit Changes
      </button>
    </div>
  );
}

export default AdminCategories;
