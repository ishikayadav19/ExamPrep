import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Session = () => {
  const [form, setForm] = useState({ name: '', description: '', startDate: '', endDate: '' });
  const [data, setData] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [id, setId] = useState({id:''});

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editForm) {
        const res = await axios.put(`http://localhost:5000/api/session/${id.id}`, form);
        if (res) {
          alert('Session updated Successfully');
          handlefetch();
        }
      }
      else {
        const res = await axios.post('http://localhost:5000/api/session', form);
        if (res) {
          alert('Session Added Successfully');
          handlefetch();
        }
      }
      setForm({ name: '', description: '', startDate: '', endDate: '' });
      setEditForm(null);
      setId({ id: '' })
    } 
    catch (err) {
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

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/session/${id}`);
    if (res) {
      alert('Deleted Successfully');
      handlefetch();
    } else {
      alert('Sorry, try again later');
    }
  };

  const handleEdit = async (item) => {
    setForm({
      name: item.name,
      description: item.description,
      startDate: item.startDate ? item.startDate.slice(0,10) : '', // For input type="date"
      endDate: item.endDate ? item.endDate.slice(0,10) : '',
    });
    setEditForm(true);
    setId({id:item._id});
  }

  return (
    <div style={styles.page}>
      {/* Heading in a full-width gradient card style */}
      <div style={styles.headingBar}>
        <h1 style={styles.heading}>
          <i className="fa-solid fa-plus" style={{marginRight: 10}}></i> {editForm ? "Edit Session" : "Add Session"}
        </h1>
      </div>

      {/* Modern form card */}
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>
            <i className="fa-solid fa-heading me-2 text-white"></i> Session Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter session name"
            onChange={handleChange}
            style={styles.input}
            className='form-control'
            required
          />

          <label style={styles.label}>
            <i className="fa-solid fa-align-left me-2 text-white"></i> Session Description
          </label>
          <textarea
            name="description"
            placeholder="Enter session description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
            className='form-control'
            required
          ></textarea>

          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>
                <i className="fa-solid fa-play text-success me-2"></i> Start Date
              </label>
              <input
                type="date"
                name="startDate"
                className='form-control'
                style={styles.input}
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.col}>
              <label style={styles.label}>
                <i className="fa-solid fa-stop text-danger me-2"></i> End Date
              </label>
              <input
                type="date"
                name="endDate"
                className='form-control'
                style={styles.input}
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            <i className={`fa-solid ${editForm ? 'fa-check' : 'fa-plus'} me-1`} /> {editForm ? "Update Session" : "Add Session"}
          </button>
        </form>
      </div>

      {/* Table header gradient */}
      <div style={styles.listHeadingBar}>
        <h3 style={styles.listHeading}>
          <i className="fa-solid fa-table-list me-2"></i> Session List
        </h3>
      </div>

      {/* Table container, modern style */}
      <div style={styles.tableContainerOuter}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No.</th>
              <th style={styles.th}>Session Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Start</th>
              <th style={styles.th}>End</th>
              <th style={styles.th}>Created</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item._id}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.description}</td>
                <td style={styles.td}>{item.startDate ? item.startDate.slice(0,10) : ''}</td>
                <td style={styles.td}>{item.endDate ? item.endDate.slice(0,10) : ''}</td>
                <td style={styles.td}>{item.createdAt ? item.createdAt.slice(0,10) : ''}</td>
                <td style={styles.td}>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(item._id)}>Delete</button>
                  <button style={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// Style objects
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #a3f2f8c4, #ffffffff, #a3f2f8c4)",
    padding: '30px 12px',
    fontFamily: 'sans-serif',
  },
  headingBar: {
    width: '100%',
    margin: "0 auto 30px auto",
    background: "linear-gradient(145deg, #0d1f25, #000000)",
    borderRadius: "14px",
    padding: "12px 0 8px 0",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    margin: 0,
    color:'#fff',
    textShadow: '1px 2px 50px #6ba2a9ae',
    letterSpacing: ".5px",
    fontWeight: 'bold',
    fontSize: '2rem',
    textAlign: "center"
  },
  card: {
    background: "linear-gradient(145deg, #0e556a62, #00000068)",
    borderRadius: '18px',
    padding: '34px 26px',
    maxWidth: '600px',
    margin: '0 auto 30px auto',
    // boxShadow: " inset 50px 50px 40px #022f2b22 , inset -50px -50px 100px #0e3b377e",
    border: " 1.5px solid #1398be30",
    backdropFilter: "blur(13px)"
  },
  label: {
    display: 'block',
    marginBottom: '7px',
    fontWeight: 'bold',
    color: '#000000ff',
    fontSize: '18px',
    letterSpacing: ".6px"
  },
  input: {
    width: '100%',
    padding: '11px 13px',
    marginBottom: '18px',
    borderRadius: '11px',
    border: '1.5px solid #1cdfdf99',
    background: 'linear-gradient(135deg, #a3f2f8f8, #fffffff8, #a3f2f8d8)',
    color: '#000000ff',
    fontSize:"1.05rem",
    outline: 'none',
    fontWeight:"bold"
  },
  textarea: {
    width: '100%',
    padding: '11px 13px',
    marginBottom: '18px',
    borderRadius: '11px',
    border: '1.5px solid #1cdfdf99',
    background: 'linear-gradient(135deg, #a3f2f8fa, #fffffff8, #a3f2f8d7)',
    color: '#000000ff',
    fontSize:"1.05rem",
    resize: 'vertical',
    outline: 'none',
    fontWeight:"bold"
  },
  row: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  col: {
    flex: 1,
    minWidth:180
  },
  button: {
    width: '100%',
    background: "linear-gradient(145deg, #0d1f25, #000000)",

    color: '#fff',
    padding: '13px 0 12px',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '1.13rem',
    cursor: 'pointer',
    letterSpacing:".2px",
    boxShadow: "0 1px 10px #3cf7f359",
    marginTop: 4,
    transition: "0.2s"
  },
  listHeadingBar: {
    width: "100%",
    margin: "30px auto 8px",
    background: "linear-gradient(145deg, #0d1f25, #000000)",
    borderRadius: "13px",
    boxShadow:"0 1.5px 9px #13dbc8a5",
    padding: "8px 0 5px"
  },
  listHeading: {
    color: "#fff",
    margin: 0,
    fontWeight: 'bold',
    fontSize: "1.45rem",
    textAlign:"center",
    textShadow:"0 1.5px 5px #044f5f80"
  },
  tableContainerOuter: {
    margin: "22px auto 0 auto",
    background: "linear-gradient(130deg, #0d1f25ff 65%, #000000 100%)",
    borderRadius: "18px",
    padding: "26px 24px",
    boxShadow: "inset 5px 5px 100px 20px #00f0ff33",
    overflowX: "auto",
    maxWidth: "1200px",
  },
  table: {
    width: "100%",
    color: "#d3f2ff",
    borderCollapse: "collapse",
    fontSize: "1.05rem",
    background: "none",
    minWidth: "800px",
    borderRadius: "8px 8px 0 0"
  },
  th: {
    // background: "linear-gradient(90deg, rgba(232, 240, 245, 0.72), rgba(250, 250, 250, 0.85))",
    padding: "14px",
    fontWeight: "600",
    fontSize: "1.1rem",
    textAlign: "left",
    borderBottom: "2.5px solid #29c6f6",
    color: "#7fe9fd",
    letterSpacing: ".1px"
  },
  td: {
    padding: "13px 10px",
    borderBottom: "1.5px solid #1e3f5890",
    textAlign: "left",
    background: "rgba(255,255,255,.00)",
    fontSize:"1.07rem",
    color:"#d7faff"
  },
  deleteBtn: {
    margin: '2px 10px 2px 0',
    background: 'transparent',
    fontWeight: 'bold',
    color: '#ff4d4d',
    border: '1.5px solid #ff4d4d',
    padding: '3px 13px',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize:"1.04rem",
    transition: '0.18s',
  },
  editBtn: {
    margin: '2px 0',
    background: 'transparent',
    fontWeight: 'bold',
    color: '#02ffc6',
    border: '1.5px solid #02ffc6',
    padding: '3.5px 15px',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize:"1.04rem",
    transition: '0.18s',
  }
};

export default Session;
