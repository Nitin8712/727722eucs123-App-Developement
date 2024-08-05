import React, { useState } from 'react';
import '../HeroSection.css';
import heroVideo from '../Assets/herovid.mp4';

const HeroSection = ({ onSearch }) => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const handleSearch = () => {
    onSearch(eventName, location, price);
  };

  return (
    <div className="hero-container">
      <video autoPlay loop muted className="hero-video">
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1>Buenos Aires hotels & places to stay</h1>
      <p>Search to compare prices and discover great deals with free cancellation</p>
      <div className="hero-search-container">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleSearch}>SEARCH</button>
      </div>
    </div>
  );
};

export default HeroSection;
