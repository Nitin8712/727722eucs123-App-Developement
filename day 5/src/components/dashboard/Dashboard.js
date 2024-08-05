import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import HotelCard from './HotelCard';
import HeroSection from '../HeroSection';
import '../../Dashboard.css';

function Dashboard() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showHero, setShowHero] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHotels(data);
        setFilteredHotels(data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBookHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowHero(false);
  };

  const handleBookingSubmit = async (booking) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBookings([...bookings, booking]);
      setSelectedHotel(null);
      setShowHero(true);
      navigate('/bookings', { state: { bookings: [...bookings, booking] } });
    } catch (err) {
      setError('Failed to save booking. Please try again.');
    }
  };

  const handleSearch = (eventName, location, price) => {
    const filtered = hotels.filter((hotel) => {
      return (
        (!eventName || hotel.name.toLowerCase().includes(eventName.toLowerCase())) &&
        (!location || hotel.location.toLowerCase().includes(location.toLowerCase())) &&
        (!price || hotel.basePrice <= parseFloat(price))
      );
    });
    setFilteredHotels(filtered);
  };

  const handleRatingChange = (hotelId, newRating) => {
    setHotels(hotels.map(hotel =>
      hotel.id === hotelId ? { ...hotel, rating: newRating, reviewCount: hotel.reviewCount + 1 } : hotel
    ));
    setFilteredHotels(filteredHotels.map(hotel =>
      hotel.id === hotelId ? { ...hotel, rating: newRating, reviewCount: hotel.reviewCount + 1 } : hotel
    ));
  };

  const handleReviewSubmit = (hotelId, newReview) => {
    setHotels(hotels.map(hotel =>
      hotel.id === hotelId ? { ...hotel, reviews: [...(hotel.reviews || []), newReview] } : hotel
    ));
    setFilteredHotels(filteredHotels.map(hotel =>
      hotel.id === hotelId ? { ...hotel, reviews: [...(hotel.reviews || []), newReview] } : hotel
    ));
  };

  return (
    <div className="dashboard">
      {showHero && <HeroSection onSearch={handleSearch} />}
      <h2>Book a Hotel</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && !selectedHotel && (
        <div className="hotel-grid">
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onBookNow={() => handleBookHotel(hotel)}
              onRatingChange={handleRatingChange}
              onReviewSubmit={handleReviewSubmit}
            />
          ))}
        </div>
      )}
      {selectedHotel && (
        <BookingForm hotel={selectedHotel} onSubmit={handleBookingSubmit} />
      )}
    </div>
  );
}

export default Dashboard;
