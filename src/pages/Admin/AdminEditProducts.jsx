// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useLocation, useParams } from 'react-router-dom'

// function AdminEditProducts() {
//     const {id} =useParams();
//     const[edited,setEdited]=useState({})
//     useEffect(()=>{
//         axios.get(`http://localhost:3000/products/${id}`)
//         .then(res=>setEdited(res.data))
//         .catch(err=>console.error(err))
//     },[id])
//     const handleEdit=(e)=>{
//         e.preventDefault();
//         axios.put(`http://localhost:3000/products/${id}`,edited)
//         .then(()=>alert("product added successfully "))
//         .catch(err=>console.error(err))
//     }
//   return (
//     <div>
//     <form onSubmit={handleEdit}>
//         <label >Name</label>
//          <input type="text" value={edited.name||""} onChange={(e)=>setEdited({...edited,name:e.target.value})}/>
//         <label >Description</label>
//          <input type="text"   value={edited.description || ""} 
//     onChange={(e) => setEdited({...edited, description: e.target.value})}/>
//         <label >Price</label>
//          <input type="text"  value={edited.price || ""} 
//     onChange={(e) => setEdited({...edited, price: e.target.value})}/>
//         <label >Stock</label>
//          <input type="text"   value={edited.stock || ""} 
//     onChange={(e) => setEdited({...edited, stock: e.target.value})} />
//         <label >Image</label>
//          <input type="file"  value={edited.image || ""} 
//     onChange={(e) => setEdited({...edited, image: e.target.value})} />
//        <button type='submit' >Submit</button>
//     </form>
//     </div>
//   )
// }

// export default AdminEditProducts
// src/pages/Admin/AdminEditProducts.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminEditProducts.css"
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

  // 🔹 Fetch product by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setEdited(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // 🔹 Handle image change (FileReader for base64 string)
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

  // 🔹 Submit updated product
  const handleEdit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/products/${id}`, {
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
