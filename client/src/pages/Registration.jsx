import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    college: '',
    qualification: '',
    session: '',
    password: '',
  });

  // Fetch sessions on mount
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/session/');
        setSessions(res.data.data || []);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchSessions();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: all fields required
    const allFieldsFilled = Object.entries(formData).every(
      ([key, value]) => value.trim() !== '' && !(key === 'session' && value === '')
    );
    if (!allFieldsFilled) {
      alert('Please fill all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/examinees', formData);
      alert('Examinee Registered!');
      setFormData({
        name: '',
        email: '',
        number: '',
        address: '',
        college: '',
        qualification: '',
        session: '',
        password: '',
      });
      setShowPassword(false);
    } catch (error) {
      console.error('Submission error', error);
      alert('Failed to register');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #002028ff, #000000ff, #002028ff)',
        position: 'relative',
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      {/* Glass Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.05)',
          zIndex: 0,
        }}
      />

      <div className="container position-relative z-1">
        <div className="row justify-content-center animate__animated animate__fadeInDown">
          <div
            className="col-md-6 col-lg-5 p-4 rounded-4 shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <h2 className="text-center text-white mb-4 fw-bold">
              <i className="fas text-white fa-user-plus me-2"></i> Registration Form
            </h2>

            <form className="row g-3" onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="col-md-6">
                <label htmlFor="name" className="form-label text-white fw-semibold">
                  Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-user me-2 text-dark"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label htmlFor="email" className="form-label text-white fw-semibold">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-envelope me-2 text-dark"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-md-6">
                <label htmlFor="number" className="form-label text-white fw-semibold">
                  Phone Number
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-phone me-2 text-dark"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    name="number"
                    placeholder="+91 9876543210"
                    value={formData.number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="col-md-6">
                <label htmlFor="password" className="form-label text-white fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="input-group-text bg-white border-0"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} me-2`}
                    ></i>
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="col-md-12">
                <label htmlFor="address" className="form-label text-white fw-semibold">
                  Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-map-marker-alt me-2 text-dark"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="123 Main St, City"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* College */}
              <div className="col-md-12">
                <label htmlFor="college" className="form-label text-white fw-semibold">
                  College
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-university me-2 text-dark"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="college"
                    name="college"
                    placeholder="ABC Engineering College"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Qualification */}
              <div className="col-md-12">
                <label htmlFor="qualification" className="form-label text-white fw-semibold">
                  Qualification
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-graduation-cap me-2 text-dark"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    name="qualification"
                    placeholder="B.Tech, M.Sc, etc."
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Session */}
              <div className="col-md-12">
                <label htmlFor="session" className="form-label text-white fw-semibold">
                  Session
                </label>
                <select
                  id="session"
                  name="session"
                  className="form-select border-primary"
                  value={formData.session}
                  onChange={handleChange}
                  required
                  disabled={loadingSessions}
                >
                  <option value="" disabled>
                    {loadingSessions ? 'Loading sessions...' : 'Select Session'}
                  </option>
                  {sessions.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit button */}
              <div className="col-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-light w-100 text-light fw-bold py-2"
                  style={{
                    background: 'linear-gradient(180deg, #011c23ff, #000000ff, #011c23ff)',
                    border: 'none',
                  }}
                >
                  <i className="fas fa-paper-plane me-2"></i> Submit
                </button>
              </div>
            </form>

            {/* Login Link */}
            <p className="text-center mt-3 text-white">
              Already have an account?{' '}
              <a href="/login" className="fw-semibold text-light text-decoration-underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
