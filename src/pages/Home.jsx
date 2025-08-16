import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Categories from "../components/CategorySec";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";


function Home() {
  return (
    <>
    <Navbar />
      <Hero/>
      <Categories/>
      <ProductCard/>
     <Footer/>
      </>
  );
}

export default Home;
