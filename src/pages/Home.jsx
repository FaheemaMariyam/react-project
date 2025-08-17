import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Categories from "../components/CategorySec";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";


function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <ProductCard />
      <Footer />
    </div>
  );
}

export default Home;
