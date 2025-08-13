import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Categories from "../components/CategorySec";
import ProductCard from "../components/ProductCard";



function Home() {
  return (
    <>
    <Navbar />
      <Hero/>
      <Categories/>
      <ProductCard/>
     
      </>
  );
}

export default Home;
