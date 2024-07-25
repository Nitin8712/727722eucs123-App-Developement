import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import '../../Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const { setUserName } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) throw new Error('Login failed.');
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }
      setUserName(user.name);
      setSuccess('Login successful!');
      setModalVisible(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <h1 className="login-title">[RE]MASTER02</h1>
          <p className="login-subtitle">A TRIBUTE TO BRUTALISM</p>
          <p className="login-description">
            This limited edition features an asymmetrical 41 mm
            rectangular case in the new 18-carat sand gold alloy and
            is equipped with the Calibre 7129.
          </p>
          <button className="discover-btn">Discover more</button>
        </div>
        <div className="login-right">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}
            </form>
            <div className="login-footer">
              <p className="forgot-password-link">
                <a href="/forgot-password">Forgot Password?</a>
              </p>
              <p className="signup-link">
                Don't have an account? <a href="/register">Sign up here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Login Successful!</h2>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
