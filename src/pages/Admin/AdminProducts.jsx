// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
// function AdminProducts() {
//     const[product,setProduct]=useState([]);
//     useEffect(()=>{
//         axios.get(`http://localhost:3000/products`)
//         .then(res=>setProduct(res.data))
//         .catch(err=>console.error(err))
//     },[])
//     const addProduct=(pro)=>{
//         axios.post(`http://localhost:3000/products`,pro)
//         .then(res=>setProduct([...product,res.data]))
//         .catch(err=>console.error(err))

//     }
//     const navigate=useNavigate();
//     const categories = [
//   { id: 1, name: "Cookware & Bakeware" },
//   { id: 2, name: "Kitchen Appliances" },
//   { id: 3, name: "Storage & Organization" },
//   { id: 4, name: "Home Decor" },
//   { id: 5, name: "Cleaning & Utility" },
// ];
//   const [searchTerm, setSearchTerm] = useState("");
//    const location = useLocation();
//      const params = new URLSearchParams(location.search);
//   const categoryId = params.get("category");
// const filteredProducts = product
//     .filter((p) => !categoryId || p.categoryId === Number(categoryId))
//     .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
//     const handleCategoryClick = (id) => {
//     // if (id === "all") {
//     //   navigate("/products");
//     // } else {
//     //   navigate(`/products?category=${id}`);
//     // }
//      navigate(`/products?category=${id}`);
//   };

//   const sortByPriceLowHigh = () => {
//     setProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
//   };
//   const sortByPriceHighLow = () => {
//     setProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
//   };
//   const sortByAtoZ = () => {
//     setProduct((prev) =>
//       [...prev].sort((a, b) => a.name.localeCompare(b.name))
//     );
//   };
//   const sortByZtoA = () => {
//     setProduct((prev) =>
//       [...prev].sort((a, b) => b.name.localeCompare(a.name))
//     );
//   };
//     const[newProduct,setrNewProduct]=useState({name:"",price:"",image:"",stock:""});
//     const imageHandler=(e)=>{
//         const file=e.target.files[0];
//         if(file){
//             const reader=new FileReader();
//             reader.onloadend=()=>{
//                 setrNewProduct({...newProduct,image:reader.result})
               
//             }
//              reader.readAsDataURL(file)
//         }
//     }
//   return (
//     <div>
//         <div>
//       {product.map((pro)=>(<div key={pro.id}><div><img src={pro.image}/>{pro.name}{pro.price}</div></div>))}
//     </div>
//    <div className="category-buttons">
//         <button
//           className={`category-btn ${!categoryId ? "active" : ""}`}
//           onClick={() => handleCategoryClick("all")}
//         >
//           All
//         </button>
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             className={`category-btn ${categoryId == cat.id ? "active" : ""}`}
//             onClick={() => handleCategoryClick(cat.id)}
//           >
//             {cat.name}
//           </button>
//         ))}
//         {filteredProducts.map((pro) => (
//   <div key={pro.id}>
//     <div>
//       <img src={pro.image} alt={pro.name} />
//       {pro.name} - {pro.price}
//     </div>
//   </div>
// ))}

//       </div>

//         <form onSubmit={(e)=>{
//             e.preventDefault();
//             addProduct(newProduct)}}>
//             <label >Product Name</label>
//             <input type="text" value={newProduct.name} onChange={(e)=>setrNewProduct({...newProduct,name:e.target.value})}/>
//             <label>Product Price</label>
//             <input type="text" value={newProduct.price} onChange={(e)=>setrNewProduct({...newProduct,price:e.target.value})}/>
//             <label>Image</label>
//             <input type="file" onChange={imageHandler} />
//             <label>Stock</label>
//             <input type="text" value={newProduct.stock} onChange={(e)=>setrNewProduct({...newProduct,stock:e.target.value})} />
//             <button type='submit'>Add</button>
//         </form>
//     </div>
   
    
//   )
// }

// export default AdminProducts
import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./AdminProducts.css"; // optional: your styling file

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    stock: "",
    categoryId: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: "Cookware & Bakeware" },
    { id: 2, name: "Kitchen Appliances" },
    { id: 3, name: "Storage & Organization" },
    { id: 4, name: "Home Decor" },
    { id: 5, name: "Cleaning & Utility" },
  ];

  // Fetch all products
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add new product
  const addProduct = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/products", newProduct)
      .then((res) => {
        setProducts([...products, res.data]);
        setNewProduct({ name: "", price: "", image: "", stock: "", categoryId: 1 });
      })
      .catch((err) => console.error(err));
  };

  // Image handler
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

  // Filtered products based on search and category
  const filteredProducts = products
    .filter((p) => !selectedCategory || p.categoryId === Number(selectedCategory))
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Sorting functions
  const sortByPriceLowHigh = () => setProducts([...products].sort((a, b) => a.price - b.price));
  const sortByPriceHighLow = () => setProducts([...products].sort((a, b) => b.price - a.price));
  const sortByAtoZ = () => setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
  const sortByZtoA = () => setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));

  return (
    <div className="admin-products-page">
      <h2>Admin Products</h2>

      {/* Search & Sort */}
      <div className="admin-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="sort-buttons">
          <button onClick={sortByPriceLowHigh}>Price: Low–High</button>
          <button onClick={sortByPriceHighLow}>Price: High–Low</button>
          <button onClick={sortByAtoZ}>A-Z</button>
          <button onClick={sortByZtoA}>Z-A</button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-buttons">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={selectedCategory === cat.id ? "active" : ""}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="admin-products-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="admin-product-card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
            <p>Category: {categories.find((c) => c.id === p.categoryId)?.name}</p>
          </div>
        ))}
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>

      {/* Add New Product */}
      <form className="admin-add-product-form" onSubmit={addProduct}>
        <h3>Add New Product</h3>
        <label>Product Name</label>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />

        <label>Price</label>
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />

        <label>Stock</label>
        <input
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          required
        />

        <label>Category</label>
        <select
          value={newProduct.categoryId}
          onChange={(e) => setNewProduct({ ...newProduct, categoryId: Number(e.target.value) })}
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
  );
}

export default AdminProducts;
