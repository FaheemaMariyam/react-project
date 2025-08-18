
import React, { useState, useEffect } from "react";
import "./Hero.css";

const images = [
  "/products/hero1.jpg",
  "/products/hero2.jpg",
  "/products/hero3.jpg"
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
       
      </div>
    </section>
  );
};

export default Hero;
