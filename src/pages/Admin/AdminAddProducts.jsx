// import React, { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import axiosInstance from "../../APIs/axiosInstance";
// import "./AdminAddProducts.css";
// import { toast } from "react-toastify";
// function AdminAddProducts() {
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: "",
//     stock: "",

//     categoryId: 1,
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
// //   const addProduct = (e) => {
// //     e.preventDefault();
// //     setError("");
// //     const formData = new FormData();
// //   formData.append("name", newProduct.name);
// //   formData.append("description", newProduct.description);
// //   formData.append("price", newProduct.price);
// //   formData.append("stock", newProduct.stock);
// //   formData.append("category", newProduct.categoryId);

// //   if (newProduct.imageFile) {
// //     formData.append("image", newProduct.imageFile);
// //   }
// //     axiosInstance
// //     .post("/admin/products/", formData, {
// //       headers: { "Content-Type": "multipart/form-data" },
// //     })
// //     .then(() => {
// //       setNewProduct({
// //         name: "",
// //         description: "",
// //         price: "",
// //         stock: "",
// //         categoryId: 1,
// //         image: "",
// //         imageFile: null,
// //       });
// //       toast.success("Product added successfully")
// //       navigate("/admin/products");
// //     })
// //     .catch((err) => {
// //       console.error(err);
// //       setError("Failed to add product. Please try again");
// //     });
// // };
// const addProduct = (e) => {
//   e.preventDefault();
//   setError("");

//   const formData = new FormData();
// formData.append("name", newProduct.name);
// formData.append("description", newProduct.description);
// formData.append("price", newProduct.price);
// formData.append("stock", newProduct.stock);
// formData.append("category", newProduct.categoryId);  // MUST BE category
// formData.append("image", newProduct.imageFile);      // MUST be file


//   // IMPORTANT: only append real file, not preview
//   if (newProduct.imageFile) {
//     formData.append("image", newProduct.imageFile);
//   }

//   axiosInstance
//     .post("/admin/products/", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     })
//     .then(() => {
//       toast.success("Product added successfully");

//       setNewProduct({
//         name: "",
//         description: "",
//         price: "",
//         stock: "",
//         categoryId: 1,
//         image: "",
//         imageFile: null,
//       });

//       navigate("/admin/products");
//     })
//     .catch((err) => {
//       console.error("UPLOAD ERROR:", err);
//       setError("Failed to add product. Please try again");
//     });
// };

//   // const categories = [
//   //   { id: 1, name: "Cookware & Bakeware" },
//   //   { id: 2, name: "Kitchen Appliances" },
//   //   { id: 3, name: "Storage & Organization" },
//   //   { id: 4, name: "Home Decor" },
//   //   { id: 5, name: "Cleaning & Utility" },
//   // ];
// const [categories, setCategories] = useState([]);

// useEffect(() => {
//   axiosInstance.get("/categories/")
//     .then((res) => setCategories(res.data))
//     .catch(() => console.log("Error fetching categories"));
// }, []);

// //   const handleImageChange = (e) => {
// //   const file = e.target.files[0];
// //   if (file) {
// //     setNewProduct({ ...newProduct, imageFile: file });

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setNewProduct((prev) => ({ ...prev, image: reader.result }));
// //     };
// //     reader.readAsDataURL(file);
// //   }
// // };
// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     setNewProduct({ ...newProduct, imageFile: file });

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setNewProduct((prev) => ({ ...prev, image: reader.result })); // preview only
//     };
//     reader.readAsDataURL(file);
//   }
// };


//   return (
//     <div>
//       <div className="admin-add-product-page">
//         <form className="admin-add-product-form" onSubmit={addProduct}>
//           <h3>Add New Product</h3>
//           <label>Product Name</label>
//           <input
//             type="text"
//             value={newProduct.name}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, name: e.target.value })
//             }
//             required
//           />
//           <label>Description</label>
//           <input
//             type="text"
//             value={newProduct.description}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, description: e.target.value })
//             }
//             required
//           />

//           <label>Price</label>
//           <input
//             type="number"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, price: e.target.value })
//             }
//             required
//           />

//           <label>Stock</label>
//           <input
//             type="number"
//             value={newProduct.stock}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, stock: e.target.value })
//             }
//             required
//           />

//           <label>Category</label>
//           <select
//             value={newProduct.categoryId}
//             onChange={(e) =>
//               setNewProduct({
//                 ...newProduct,
//                 categoryId: Number(e.target.value),
//               })
//             }
//           >
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <label>Image</label>
// <input type="file" onChange={handleImageChange} required />

// {/* Image preview */}
// {newProduct.image && (
//   <div style={{ margin: "10px 0" }}>
//     <img
//       src={newProduct.image}
//       alt="Preview"
//       style={{ width: "100px", borderRadius: "5px" }}
//     />
//   </div>
// )}


//           <button type="submit">Add Product</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminAddProducts;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../APIs/axiosInstance";
import { toast } from "react-toastify";
import "./AdminAddProducts.css";

function AdminAddProducts() {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: 1,
    imageFile: null, // actual file for upload
    image: "",       // preview URL
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Fetch categories safely
  useEffect(() => {
    axiosInstance
      .get("/categories/")
      .then((res) => {
        // Check if res.data is an array or has results
        const cats = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setCategories(cats);

        // Set default categoryId if not already set
        if (cats.length > 0 && !newProduct.categoryId) {
          setNewProduct((prev) => ({ ...prev, categoryId: cats[0].id }));
        }
      })
      .catch(() => {
        console.log("Error fetching categories");
        setCategories([]); // fallback
      });
  }, []);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, imageFile: file });

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit new product
  const addProduct = (e) => {
    e.preventDefault();
    setError("");

    if (!newProduct.imageFile) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("category", newProduct.categoryId);
    formData.append("image", newProduct.imageFile);

    axiosInstance
      .post("/admin/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Product added successfully");

        // Reset form
        setNewProduct({
          name: "",
          description: "",
          price: "",
          stock: "",
          categoryId: categories.length > 0 ? categories[0].id : 1,
          imageFile: null,
          image: "",
        });

        navigate("/admin/products");
      })
      .catch((err) => {
        console.error("UPLOAD ERROR:", err.response?.data || err.message);
        setError("Failed to add product. Please check your inputs.");
      });
  };

  return (
    <div className="admin-add-product-page">
      <form className="admin-add-product-form" onSubmit={addProduct}>
        <h3>Add New Product</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

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
        <textarea
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
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>

        <label>Image</label>
        <input type="file" onChange={handleImageChange} required />

        {newProduct.image && (
          <div style={{ margin: "10px 0" }}>
            <img
              src={newProduct.image}
              alt="Preview"
              style={{ width: "100px", borderRadius: "5px" }}
            />
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminAddProducts;
