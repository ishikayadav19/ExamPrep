import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Session = () => {
  const [form, setForm] = useState({ name: '', description: '' });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/session', form);
      if (res) alert('Session Added Successfully');
    } catch (err) {
      alert('Sorry, try again later');
    }
  };

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/session');
    setData(res.data.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleDelete =  (id) => {
    console.log(id);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>
        <i className="fa-solid fa-plus"></i> Add Session
      </h1>

      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>
            <i className="fa-solid fa-heading me-2 text-white"></i> Session Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter session name"
            onChange={handleChange}
            style={styles.input}
            className='form-control'
          />

          <label style={styles.label}>
            <i className="fa-solid fa-align-left me-2 text-white"></i> Session Description
          </label>
          <textarea
            name="description"
            placeholder="Enter session description"
            rows="4"
            onChange={handleChange}
            style={styles.textarea}
            className='form-control'
          ></textarea>

          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>
                <i className="fa-solid fa-play text-success me-2"></i> Start Date
              </label>
              <input type="date" className='form-control' style={styles.input} />
            </div>
            <div style={styles.col}>
              <label style={styles.label}>
                <i className="fa-solid fa-stop text-danger me-2"></i> End Date
              </label>
              <input type="date" className='form-control' style={styles.input} />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            <i className="fa-solid fa-plus me-1"></i> Add Session
          </button>
        </form>
      </div>

      <h3 style={styles.listHeading}>
        <i className="fa-solid fa-table-list me-2"></i> Session List
      </h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th>S.No.</th>
              <th>Session Name</th>
              <th>Description</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(145deg, #0d1f25, #000000)',
    minHeight: '100vh',
    margin: 0,
    
    padding: '40px 20px',
    color: 'white',
    fontFamily: 'sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.19)',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '700px',
    margin: '0 auto 40px',
    boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: '0.3s ease-in-out',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '15px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: '1px solid #999',
    background: '#111',
    color: '#fff',
    outline: 'none',
    transition: '0.3s',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: '1px solid #999',
    background: '#111',
    color: '#fff',
    resize: 'vertical',
    outline: 'none',
  },
  row: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  col: {
    flex: '1',
  },
  button: {
    width: '100%',
    background: '#fff',
    color: '#000',
    padding: '10px',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  },
  listHeading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff',
  },
  tableContainer: {
    overflowX: 'auto',
    padding: '0 10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'rgba(255, 255, 255, 1)',
    color: '#000',
    borderRadius: '10px',
    boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
    
  },
  thead: {
    background: '#eeeeeee8',
    borderBottom: '2px solid #ddd',
  },
  deleteBtn: {
    margin: '5px 0',
    background: 'transparent',
    fontWeight: 'bold',
    color: '#ff4d4d',
    border: '1px solid #ff4d4d',
    padding: '3px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.2s',
  },
};

export default Session;
