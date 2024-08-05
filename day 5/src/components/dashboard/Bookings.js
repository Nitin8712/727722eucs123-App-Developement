import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import '../../Bookings.css';

function Bookings() {
  const { userRole } = useUser();
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const newBookingMade = location.state?.newBooking || false;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings.');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [newBookingMade]);

  const handleChat = (bookingId) => {
    // Implement chat functionality here
    console.log(`Chat initiated for booking ${bookingId}`);
  };

  const handlePay = (bookingId) => {
    // Implement payment functionality here
    console.log(`Payment initiated for booking ${bookingId}`);
  };

  return (
    <div className="bookings">
      <h2>Booking Tracking</h2>
      {newBookingMade && <p className="success-message">New booking confirmed!</p>}
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-card">
              <div className="booking-info">
                <h3>Booking ID: {booking.id}</h3>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Number of People:</strong> {booking.numberOfPeople}</p>
                <p><strong>Total Cost:</strong> ${booking.cost}</p>
              </div>
              <div className="booking-actions">
                <button onClick={() => handleChat(booking.id)} className="chat-button">Click to Chat</button>
                <button onClick={() => handlePay(booking.id)} className="pay-button">Pay to Confirm</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Bookings;
