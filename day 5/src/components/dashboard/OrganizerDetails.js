import React, { useState } from 'react';
import '../../OrganizerDetails.css';

function OrganizerDetails({ organizer, onBook }) {
  const [ratings, setRatings] = useState([
    { id: 1, user: 'Alice', rating: 5, comment: 'Great service!' },
    { id: 2, user: 'Bob', rating: 4, comment: 'Very professional.' }
  ]);

  return (
    <div className="organizer-details">
      <h3>{organizer.name}</h3>
      <p>Specialization: {organizer.specialization}</p>
      <p>Contact: {organizer.contact}</p>
      <p>Description: {organizer.description}</p>
      <button className="cta-button" onClick={() => onBook(organizer)}>Book Now</button>

      <h4>Ratings and Reviews</h4>
      <div className="reviews">
        {ratings.map(review => (
          <div key={review.id} className="review">
            <p><strong>{review.user}</strong>: {review.rating} stars</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrganizerDetails;
