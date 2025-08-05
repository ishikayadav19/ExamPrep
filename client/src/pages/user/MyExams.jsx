import React, { useEffect, useState } from 'react';
// import { styles } from './styles'; // If you put your styles in a separate file, you can import here

// Demo data for "My exams"
const demoData = [
  {
    _id: '1',
    examName: 'Mathematics',
    dateOfExam: '2024-07-01',
    totalMarks: 100,
    obtainMarks: 89,
    status: 'Passed'
  },
  {
    _id: '2',
    examName: 'Physics',
    dateOfExam: '2024-07-10',
    totalMarks: 100,
    obtainMarks: 53,
    status: 'Passed'
  },
  {
    _id: '3',
    examName: 'History',
    dateOfExam: '2024-07-15',
    totalMarks: 100,
    obtainMarks: 32,
    status: 'Failed'
  }
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
  statusPass: {
    color: 'lime',
    fontWeight: 'bold'
  },
  statusFail: {
    color: '#ff4d4d',
    fontWeight: 'bold'
  }
};

const MyExam = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace this with API as needed
    setData(demoData);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.listHeadingBar}>
        <h3 style={styles.listHeading}>
          My Exams
        </h3>
      </div>
      <div style={styles.tableContainerOuter}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No.</th>
              <th style={styles.th}>Exam Name</th>
              <th style={styles.th}>Date of Exam</th>
              <th style={styles.th}>Total Marks</th>
              <th style={styles.th}>Obtain Marks</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item._id}>
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>{item.examName}</td>
                <td style={styles.td}>{item.dateOfExam}</td>
                <td style={styles.td}>{item.totalMarks}</td>
                <td style={styles.td}>{item.obtainMarks}</td>
                <td style={{
                    ...styles.td,
                    ...(item.status === "Passed" ? styles.statusPass : styles.statusFail)
                  }}>
                    {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyExam;
