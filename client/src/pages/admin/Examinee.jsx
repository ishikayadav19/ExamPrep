import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import 'animate.css';

const Examinee = () => {
  const [examinees, setExaminees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    qualification: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Examinee Manager';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExaminees([...examinees, formData]);
    setFormData({
      name: '',
      email: '',
      college: '',
      qualification: '',
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const handleDelete = (index) => {
    const updated = examinees.filter((_, i) => i !== index);
    setExaminees(updated);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{
        background: 'linear-gradient(135deg, #1CB5E0, #000046)',
        padding: '30px',
      }}
    >
      <div className="container">
        <div
          className="card shadow-lg border-0 animate__animated animate__fadeIn"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <div className="card-header text-white text-center" style={{ background: 'linear-gradient(135deg, #1CB5E0, #000046)' }}>
            <h4 className="mb-0 fw-bold">🎓 Add Examinee</h4>
          </div>
          <div className="card-body p-4 bg-light">
            {submitted && (
              <div className="alert alert-success text-center animate__animated animate__fadeInDown">
                ✅ Examinee added successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">College</label>
                  <input
                    type="text"
                    className="form-control"
                    name="college"
                    placeholder="Enter college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qualification"
                    placeholder="Enter qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
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
                    ➕ Add Examinee
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-5 bg-white rounded shadow p-4 animate__animated animate__fadeInUp">
          <h5 className="mb-3 text-center text-dark fw-bold">📋 Examinee List</h5>
          <div className="table-responsive">
            <table className="table table-hover table-striped text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>College</th>
                  <th>Qualification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {examinees.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-muted py-3">
                      No examinees added yet.
                    </td>
                  </tr>
                ) : (
                  examinees.map((exam, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{exam.name}</td>
                      <td>{exam.email}</td>
                      <td>{exam.college}</td>
                      <td>{exam.qualification}</td>
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

export default Examinee;
