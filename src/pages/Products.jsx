// import React from 'react'
// import Categories from '../components/CategorySec'


// function ProductList() {
//   return (
//     <div>
//      <Categories/> 
//     </div>
//   )
// }

// export default ProductList
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products } from "../data/productsData";
import "./Products.css";

function useCategoryId() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("category");
  return id ? Number(id) : null;
}

const Products = () => {
  const navigate = useNavigate();
  const categoryId = useCategoryId();

  const shownProducts = useMemo(() => {
    if (!categoryId) return products;                 // no param => show all
    return products.filter(p => p.categoryId === categoryId);
  }, [categoryId]);

  const clearFilter = () => navigate("/products");

  return (
    <section className="products-page">
      <div className="products-header">
        <h2>{categoryId ? `Products (Category ${categoryId})` : "All Products"}</h2>
        {categoryId && (
          <button className="clear-filter-btn" onClick={clearFilter}>
            Show All
          </button>
        )}
      </div>

      <div className="products-grid">
        {shownProducts.length ? (
          shownProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <div className="product-img-wrap">
                <img src={p.image} alt={p.name} />
              </div>
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default Products;
