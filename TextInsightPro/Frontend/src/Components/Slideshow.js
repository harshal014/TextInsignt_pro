import React, { useState, useEffect } from 'react';
// import './Slideshow.css'; // Import your custom CSS for styling

const Slideshow = ({ images, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(slideTimer);
    };
  }, [images.length, interval]);

  return (
    <div className="slideshow-container">
      {images.map((image, idx) => (
        <div
          key={idx}
          className={idx === index ? 'slide fade-in' : 'slide fade-out'}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
};

export default Slideshow;
