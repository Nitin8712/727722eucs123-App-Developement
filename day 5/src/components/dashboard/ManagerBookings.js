import React, { useState, useEffect } from 'react';
import '../../Bookings.css';  // Ensure this CSS file is imported

function ManagerBookings() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events.');
        }
        const data = await response.json();
        setEvents(data || []);
      } catch (err) {
        setError('Failed to load events.');
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bookings">
      <h2>Event Tracking</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="booking-grid">
        {events.length === 0 && <p>No events found.</p>}
        {events.map((event) => (
          <div key={event.id} className="booking-card">
            <div className="booking-info">
              <h3>{event.name}</h3>
              <p><strong>ID:</strong> {event.id}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Rating:</strong> {event.rating}</p>
              <p><strong>Review Count:</strong> {event.reviewCount}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Base Price:</strong> ${event.basePrice}</p>
            </div>
            <div className="booking-actions">
              <button className="chat-button">Chat with Clients</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerBookings;
