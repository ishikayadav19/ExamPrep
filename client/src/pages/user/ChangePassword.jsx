import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const email = localStorage.getItem('userEmail') || '';
  const [data, setData] = useState({
    op: '',
    np: '',
    cnp: '',
    email: email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations
    if (!data.op || !data.np || !data.cnp) {
      alert('Please fill in all password fields');
      return;
    }
    if (data.np !== data.cnp) {
      alert('New password and confirm password do not match');
      return;
    }
    if (data.op === data.np) {
      alert('New password must be different from old password');
      return;
    }

    try {
      const res = await axios.put('http://localhost:5000/api/examinee/change', data);
      if (res.status === 200 && res.data.success) {
        alert(res.data.message);
        // Clear form
        setData({ op: '', np: '', cnp: '', email: email });
      } else {
        alert(res.data.message || 'Could not change password');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Sorry, an error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container-fluid mt-5" style={{ width: '400px' }}>
      <div className="card shadow-sm p-4">
        <h4 className="mb-4">Change Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              name="op"
              value={data.op}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="np"
              value={data.np}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              name="cnp"
              value={data.cnp}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
