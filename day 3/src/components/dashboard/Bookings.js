import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../Bookings.css';

function Bookings() {
  const location = useLocation();
  const bookings = location.state?.bookings || [];

  return (
    <div className="bookings">
      <h2>Booking Tracking</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <h3>{booking.organizer.name}</h3>
              <p>Name: {booking.name}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Address: {booking.address}</p>
              <p>Phone: {booking.phone}</p>
              <p>Number of People: {booking.numberOfPeople}</p>
              <p>Total Cost: ${booking.cost}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Bookings;
