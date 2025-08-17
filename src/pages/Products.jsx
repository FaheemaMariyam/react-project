
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa"; 
import "./Products.css";
import Navbar from "../components/Navbar";
import { WishlistContext } from "../context/wishlistContext";
import { CartContext } from "../context/CartContext";

const categories = [
  { id: 1, name: "Cookware & Bakeware" },
  { id: 2, name: "Kitchen Appliances" },
  { id: 3, name: "Storage & Organization" },
  { id: 4, name: "Home Decor" },
  { id: 5, name: "Cleaning & Utility" },
];

const Products = () => {
  const{wishlist,toggleWishlist}=useContext(WishlistContext)
  const{addCart}=useContext(CartContext)
  
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products
    .filter((p) => !categoryId || p.categoryId === Number(categoryId))
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCategoryClick = (id) => {
    if (id === "all") {
      navigate("/products");
    } else {
      navigate(`/products?category=${id}`);
    }
  };

  // Sort handlers
  const sortByPriceLowHigh = () => {
    setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
  };
  const sortByPriceHighLow = () => {
    setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
  };
  // const sortByNameAZ = () => {
  //   setProducts((prev) => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
  // };
  // const sortByNameZA = () => {
  //   setProducts((prev) => [...prev].sort((a, b) => b.name.localeCompare(a.name)));
  // };

  return (
    <div className="products-page">
      <Navbar />

      {/* <h2 className="category-heading">
        {categoryId
          ? categories.find((cat) => cat.id === Number(categoryId))?.name || "Category"
          : "All Products"}
      </h2> */}

     
      <div className="sort-search-row">
      
        <div className="sort-left">
          <button className="sort-btn" onClick={sortByPriceLowHigh}>
            Price: Low–High
          </button>
          <button className="sort-btn" onClick={sortByPriceHighLow}>
            Price: High–Low
          </button>
        </div>

       
        <div className="search-container">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <FaSearch className="search-icon" />
</div>


        
        {/* <div className="sort-right">
          <button className="sort-btn" onClick={sortByNameAZ}>
            Name: A–Z
          </button>
          <button className="sort-btn" onClick={sortByNameZA}>
            Name: Z–A
          </button>
        </div> */}
      </div>

      
      <div className="category-buttons">
        <button
          className={`category-btn ${!categoryId ? "active" : ""}`}
          onClick={() => handleCategoryClick("all")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${categoryId == cat.id ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((p) => {
          const isInWishlist=wishlist.some((item=>item.id===p.id))
          return (

          <div key={p.id} className="product-card">
            <button className="wishlist-btn" onClick={()=>toggleWishlist(p)}>
              <FaHeart color={isInWishlist? "#d48b6e" : "#dcc4bbff"} />
            </button>
            <div className="product-img-wrap">
              <img src={p.image} alt={p.name} />
            </div>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button className="add-to-cart-btn" onClick={()=>addCart(p)}>Add to Cart</button>
          </div>
        )})}
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
};

export default Products;
