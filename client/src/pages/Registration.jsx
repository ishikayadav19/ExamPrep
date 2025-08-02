import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #002028ff, #000000ff,   #002028ff)',
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
        <div className="row justify-content-center animate__animated animate__fadeInDown">
          <div
            className="col-md-6 col-lg-5 p-5 rounded-4 shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <h2 className="text-center text-white mb-4 fw-bold">
              <i className="fas text-white fa-user-plus me-2"></i> Registration Form
            </h2>

            <form className="row g-3">
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
                    className="form-control "
                    id="name"
                    placeholder="John Doe"
                  />
                </div>
              </div>
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
                    className="form-control "
                    id="email"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
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
                    className="form-control "
                    id="number"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control "
                    id="password"
                    placeholder="••••••••"
                  />
                  <span className="input-group-text bg-white border-0">
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} me-2`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </span>
                </div>

              </div>

              <div className="col-md-12">
                <label htmlFor="address" className="form-label text-white">
                Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-map-marker-alt me-2 text-dark"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control "
                    id="address"
                    placeholder="123 Main St, City"
                  />
                </div>
              </div>
               
              <div className="col-md-12">
                <label htmlFor="college" className="form-label text-white">
                 College
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-university me-2 text-dark"></i>
                  </span>
                
                  <input
                    type="text"
                    className="form-control "
                    id="college"
                    placeholder="ABC Engineering College"
                />
                </div>
              </div>

              <div className="col-md-12">
                <label htmlFor="qualification" className="form-label text-white">
                  Qualification
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-graduation-cap me-2 text-dark"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control "
                    id="qualification"
                    placeholder="B.Tech, M.Sc, etc."
                /></div>
              </div>

              <div className="col-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-light w-100 text-light fw-bold py-2"
                  style={{ background: 'linear-gradient(180deg, #011c23ff, #000000ff, #011c23ff)', border: 'none' }}
                >
                  <i className="fas fa-paper-plane me-2"></i>Submit
                </button>
              </div>
            </form>

            {/* Register Link */}
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

export default Login;
