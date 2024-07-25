import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';
import '../Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, setUserName } = useUser();
  const isDashboardPage = location.pathname === '/dashboard';

  const handleLogout = () => {
    setUserName('');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">Event Planner</div>
      <nav>
        <ul>
          {isDashboardPage ? (
            <>
              <li>Hello, {userName}</li>
              <li><Link to="/bookings">Booking Tracking</Link></li> {/* Link to booking tracking */}
              <li><button onClick={handleLogout} className="logout-button">Log Out</button></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
