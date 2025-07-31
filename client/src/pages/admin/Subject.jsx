import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Subject() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(to right, #667eea, #764ba2)', // SAME as Session
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Glassmorphic Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0,
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div
            className="col-md-6 rounded-4 shadow-lg p-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <h2 className="text-center fw-bold mb-4" style={{ color: '#4b2aad' }}>
              📘 Add Subject
            </h2>

            <form>
              <div className="mb-3">
                <label htmlFor="subjectName" className="form-label fw-semibold">
                  Subject Name
                </label>
                <input
                  type="text"
                  id="subjectName"
                  className="form-control"
                  placeholder="Enter subject name..."
                  required
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="Enter a short description..."
                  rows="4"
                  required
                  style={{ borderRadius: '10px' }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold text-white"
                style={{
                  background: 'linear-gradient(to right, #667eea, #764ba2)', // Matching button gradient
                  borderRadius: '10px',
                  border: 'none',
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subject;
