import React, { useEffect, useState } from 'react';
// import { styles } from './styles'; // Uncomment and use if you put styles in a separate file

const demoData = [
  {
    _id: '1',
    examName: 'Mathematics',
    candidates: 50,
    totalMarks: 100,
    passingMarks: 40,
    doe: '2024-07-01',
  },
  {
    _id: '2',
    examName: 'Science',
    candidates: 45,
    totalMarks: 100,
    passingMarks: 35,
    doe: '2024-07-02',
  },
  // more items...
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #a3f2f8c4, #ffffffff, #a3f2f8c4)",
    padding: '30px 12px',
    fontFamily: 'sans-serif',
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

const ResultDeclaration = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace this with your API call if desired
    setData(demoData);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.listHeadingBar}>
        <h3 style={styles.listHeading}>
          Result Declaration
        </h3>
      </div>
      <div style={styles.tableContainerOuter}>
        <table style={styles.table}>
          <thead>
          <tr>
            <th style={styles.th}>S.No.</th>
            <th style={styles.th}>Exam Name</th>
            <th style={styles.th}>Candidates</th>
            <th style={styles.th}>Total Marks</th>
            <th style={styles.th}>Passing Marks</th>
            <th style={styles.th}>DOE</th>
            <th style={styles.th}>Action</th>
          </tr>
          </thead>
          <tbody>
          {data.map((item, idx) => (
            <tr key={item._id}>
              <td style={styles.td}>{idx + 1}</td>
              <td style={styles.td}>{item.examName}</td>
              <td style={styles.td}>{item.candidates}</td>
              <td style={styles.td}>{item.totalMarks}</td>
              <td style={styles.td}>{item.passingMarks}</td>
              <td style={styles.td}>{item.doe}</td>
              <td style={styles.td}>
                <button style={styles.editBtn}>Edit</button>
                <button style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultDeclaration;
