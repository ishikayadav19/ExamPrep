import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #1CB5E0, #000046)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glass Blur Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.05)',
          zIndex: 0,
        }}
      />

      <div className="container position-relative z-1">
        <div
          className="row justify-content-center animate__animated animate__fadeInUp"
        >
          <div
            className="col-md-6 col-lg-5 p-5 rounded-4 shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              animation: 'slideIn 0.8s ease-in-out',
            }}
          >
            <h2 className="text-center text-white mb-4">
              <i className="bi bi-shield-lock-fill me-2"></i>Admin Login
            </h2>

            <form>
              {/* Email */}
              <div className="mb-3 position-relative">
                <label htmlFor="email" className="form-label text-white fw-semibold">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="bi bi-envelope-fill text-dark"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control rounded-end"
                    id="email"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="bi bi-lock-fill text-dark"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control rounded-end"
                    id="password"
                    placeholder="Enter password"
                    required
                  />
                  <span
                    className="input-group-text bg-white border-0 cursor-pointer"
                    onClick={togglePassword}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-dark`}></i>
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn text-white fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #1CB5E0, #000046)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  Sign In
                </button>
              </div>

              {/* Link */}
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
