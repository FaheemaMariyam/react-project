// Hero.jsx
import React, { useState, useEffect } from "react";
import "./Hero.css";

const images = [
  "/products/coffee2.jpg",
  "/products/cookcg.jpg",
  "/products/shelves.jpg"
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-slider">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`hero ${index}`}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
      </div>
      <div className="hero-content">
        <h1>Make Your Home Beautiful & Functional</h1>
        <button className="shop-btn">Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;
