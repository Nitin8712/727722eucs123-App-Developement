import React, { useState } from 'react';
import '../../BookingForm.css';

function BookingForm({ organizer, onSubmit }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cost = numberOfPeople * 50; // Example cost calculation
    onSubmit({ organizer, name, date, time, address, phone, numberOfPeople, cost });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Book {organizer.name}</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>Number of People:</label>
        <input type="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(Number(e.target.value))} required />
      </div>
      <button type="submit">Confirm Booking</button>
    </form>
  );
}

export default BookingForm;
