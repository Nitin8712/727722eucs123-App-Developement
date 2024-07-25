import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm'; 
import '../../Dashboard.css';

function Dashboard() {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setOrganizers([
          { id: 1, name: 'John Doe Events', specialization: 'Weddings', contact: '123-456-7890' },
          { id: 2, name: 'Elite Event Planners', specialization: 'Corporate Events', contact: '234-567-8901' },
          { id: 3, name: 'Celebration Creators', specialization: 'Birthday Parties', contact: '345-678-9012' },
        ]);
      } catch (err) {
        setError('Failed to load organizers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizers();
  }, []);

  const handleBookOrganizer = (organizer) => {
    setSelectedOrganizer(organizer);
  };

  const handleBookingSubmit = (booking) => {
    setBookings([...bookings, booking]);
    setSelectedOrganizer(null);
    navigate('/bookings', { state: { bookings: [...bookings, booking] } });
  };

  return (
    <div className="dashboard">
      <h2>Book an Event Organizer</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && !selectedOrganizer && (
        <div className="organizer-grid">
          {organizers.map(organizer => (
            <div key={organizer.id} className="organizer-card">
              <h3>{organizer.name}</h3>
              <p>Specialization: {organizer.specialization}</p>
              <p>Contact: {organizer.contact}</p>
              <button className="cta-button" onClick={() => handleBookOrganizer(organizer)}>Book Now</button>
            </div>
          ))}
        </div>
      )}
      {selectedOrganizer && (
        <BookingForm organizer={selectedOrganizer} onSubmit={handleBookingSubmit} />
      )}
    </div>
  );
}

export default Dashboard;
