import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #1CB5E0, #000046)',
        position: 'relative',
        overflow: 'hidden',
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
        <div className="row justify-content-center animate__animated animate__fadeInUp">
          <div
            className="col-md-6 col-lg-5 p-5 rounded-4 shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <h2 className="text-center text-white mb-4">
              <i className="bi bi-box-arrow-in-right me-2"></i>Login
            </h2>

            <form className="row g-3">
              {/* Email */}
              <div className="col-12">
                <label htmlFor="inputEmail4" className="form-label text-white fw-semibold">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="bi bi-envelope-fill text-dark"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="col-12">
                <label htmlFor="inputPassword4" className="form-label text-white fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="bi bi-lock-fill text-dark"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Enter password"
                    required
                  />
                  <span
                    className="input-group-text bg-white border-0"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-dark`}></i>
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button
                  type="submit"
                  className="btn text-white w-100 fw-bold"
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
                  Sign in
                </button>
              </div>
            </form>

            {/* Register Link */}
            <p className="text-center mt-3 text-white">
              Don’t have an account?{' '}
              <a href="/register" className="fw-semibold text-light text-decoration-underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
