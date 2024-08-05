import React, { useState } from 'react';

const HotelCard = ({ hotel, onBookNow, onRatingChange, onReviewSubmit }) => {
  const [guestCount, setGuestCount] = useState(1);
  const [userRating, setUserRating] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newReview, setNewReview] = useState('');

  const calculatePrice = (basePrice, guestCount) => basePrice * guestCount;

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
    onRatingChange(hotel.id, newRating);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      onReviewSubmit(hotel.id, newReview);
      setNewReview('');
    }
  };

  return (
    <div className={`hotel-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="hotel-card-left">
        <img src={hotel.image} alt={hotel.name} className="hotel-card-image" />
      </div>
      <div className="hotel-card-middle">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-location">{hotel.location}</p>
        <div className="hotel-stars">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < (userRating !== null ? userRating : Math.floor(hotel.rating)) ? 'star filled' : 'star'}
              onClick={(e) => { e.stopPropagation(); handleRatingChange(i + 1); }}
            >
              &#9733;
            </span>
          ))}
          <span className="review-count">{hotel.reviewCount} reviews</span>
        </div>
        <div className="hotel-amenities">
          {hotel.amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
        </div>
        <p className="hotel-description">{hotel.description}</p>
        <div className="recent-review">
          <h4>Recent Review</h4>
          <p>"{hotel.recentReview}"</p>
        </div>
        {isExpanded && (
          <>
            <div className="all-reviews">
              <h4>All Reviews</h4>
              {(hotel.reviews || []).map((review, index) => (
                <p key={index}>"{review}"</p>
              ))}
            </div>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <h4>Add a Review</h4>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here"
              />
              <button type="submit">Submit Review</button>
            </form>
          </>
        )}
      </div>
      <div className="hotel-card-right">
        <div className="price-container">
          <p className="price">Rs. {calculatePrice(hotel.basePrice, guestCount)}</p>
          <p className="price-per-night">per night</p>
        </div>
        <div className="guest-count">
          <button onClick={(e) => { e.stopPropagation(); setGuestCount(Math.max(1, guestCount - 1)); }}>-</button>
          <span>{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
          <button onClick={(e) => { e.stopPropagation(); setGuestCount(guestCount + 1); }}>+</button>
        </div>
        <button className="book-now" onClick={(e) => { e.stopPropagation(); onBookNow(); }}>Book Now</button>
      </div>
    </div>
  );
};

export default HotelCard;
