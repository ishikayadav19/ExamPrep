import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import 'animate.css';

const Session = () => {
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDetails, setSessionDetails] = useState('');
  const [sessions, setSessions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Session Manager';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSession = {
      title: sessionTitle,
      description: sessionDetails,
    };

    setSessions([...sessions, newSession]);
    setSessionTitle('');
    setSessionDetails('');
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 2000);
  };

  const handleDelete = (index) => {
    const updatedSessions = sessions.filter((_, i) => i !== index);
    setSessions(updatedSessions);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{
        background: 'linear-gradient(135deg, #1CB5E0, #000046)',
       
      }}
    >
      <div className="container">
        {/* Form Card */}
        <div
          className="card shadow-lg border-0 animate__animated animate__fadeIn"
          style={{ maxWidth: '700px', margin: '0 auto', borderRadius: '18px' }}
        >
          <div
            className="card-header text-white text-center"
            style={{
              background: 'linear-gradient(135deg, #1CB5E0, #000046)',
              borderTopLeftRadius: '18px',
              borderTopRightRadius: '18px',
            }}
          >
            <h4 className="mb-0 fw-bold">📝 Create New Session</h4>
          </div>
          <div className="card-body p-4 bg-light">
            {submitted && (
              <div className="alert alert-success text-center animate__animated animate__fadeInDown">
                ✅ Session created successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="sessionTitle" className="form-label">
                  Session Title
                </label>
                <input
                  type="text"
                  id="sessionTitle"
                  className="form-control"
                  placeholder="Enter session title"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="sessionDetails" className="form-label">
                  Session Details
                </label>
                <textarea
                  id="sessionDetails"
                  className="form-control"
                  rows="4"
                  placeholder="Enter session description"
                  value={sessionDetails}
                  onChange={(e) => setSessionDetails(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn w-100 text-white"
                style={{
                  background: 'linear-gradient(135deg, #1CB5E0, #000046)',
                  transition: '0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                ➕ Create Session
              </button>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-5 bg-white rounded shadow p-4 animate__animated animate__fadeInUp">
          <h5 className="mb-3 text-center text-dark fw-bold">📚 All Sessions</h5>
          <div className="table-responsive">
            <table className="table table-hover table-striped text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Session Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-muted py-3">
                      No sessions added yet.
                    </td>
                  </tr>
                ) : (
                  sessions.map((session, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{session.title}</td>
                      <td>{session.description}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(index)}
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
