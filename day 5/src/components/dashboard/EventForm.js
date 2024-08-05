import React, { useState } from 'react';
import '../../EventForm.css';

function EventForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    rating: '',
    reviewCount: '',
    image: '',
    amenities: '',
    description: '',
    recentReview: '',
    basePrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some(field => field.trim() === '')) {
      alert('All fields are required.');
      return;
    }
    const formattedData = {
      ...formData,
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      amenities: formData.amenities.split(',').map(amenity => amenity.trim()),
      basePrice: parseFloat(formData.basePrice),
    };

    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        alert('Event added successfully!');
        setFormData({
          id: '',
          name: '',
          location: '',
          rating: '',
          reviewCount: '',
          image: '',
          amenities: '',
          description: '',
          recentReview: '',
          basePrice: '',
        });
        // Optionally call onSubmit with the formattedData if needed
        if (onSubmit) {
          onSubmit(formattedData);
        }
      } else {
        alert('Failed to add event.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h3>Add New Event</h3>
      <div className="form-group">
        <label htmlFor="id">ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Event Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          step="0.1"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reviewCount">Review Count:</label>
        <input
          type="number"
          id="reviewCount"
          name="reviewCount"
          value={formData.reviewCount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amenities">Amenities (comma separated):</label>
        <input
          type="text"
          id="amenities"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="recentReview">Recent Review:</label>
        <textarea
          id="recentReview"
          name="recentReview"
          value={formData.recentReview}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="basePrice">Base Price:</label>
        <input
          type="number"
          id="basePrice"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="cta-button">Add Event</button>
    </form>
  );
}

export default EventForm;
