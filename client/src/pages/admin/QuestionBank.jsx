import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionBank = () => {
  const [formData, setFormData] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    subject: '',
  });

  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    fetchQuestions();
    fetchSubjects();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/question`);
      setQuestions(res.data.data || []);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/subject`);
      setSubjects(res.data.data || []);
    } catch (err) {
      console.error('Error fetching subjects', err);
      setSubjects([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editForm) {
        await axios.put(`http://localhost:5000/api/question/${id}`, formData);
        setEditForm(false);
        setId('');
        fetchQuestions();
      } else {
        await axios.post(`http://localhost:5000/api/question`, formData);
        fetchQuestions();
      }
      setFormData({
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        subject: '',
      });
    } catch (err) {
      console.error(err);
      alert('Sorry, try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/question/${id}`);
      alert('Deleted successfully');
      fetchQuestions();
    } catch (err) {
      alert('Try again later.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      questionText: item.questionText,
      optionA: item.optionA,
      optionB: item.optionB,
      optionC: item.optionC,
      optionD: item.optionD,
      correctAnswer: item.correctAnswer,
      subject: item.subject,
    });
    setEditForm(true);
    setId(item._id);
  };

  return (
    <div style={styles.page}>
      {/* Gradient Heading Bar */}
      <div style={styles.headingBar}>
        <h1 style={styles.heading}>
          <i className="fa-solid fa-question-circle" style={{ marginRight: 10 }} />
          {editForm ? "Edit Question" : "Question Bank"}
        </h1>
      </div>

      {/* Form Card */}
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.formGroupWide}>
              <label style={styles.label}>
                <i className="fa-solid fa-question me-2"></i> Question
              </label>
              <input
                type="text"
                name="questionText"
                value={formData.questionText}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Enter question here"
              />
            </div>

            {/* Options A & B */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <i className="fa-regular fa-square me-2"></i> Option A
              </label>
              <input
                type="text"
                name="optionA"
                value={formData.optionA}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Option A"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <i className="fa-regular fa-square me-2"></i> Option B
              </label>
              <input
                type="text"
                name="optionB"
                value={formData.optionB}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Option B"
              />
            </div>

            {/* Options C & D */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <i className="fa-regular fa-square me-2"></i> Option C
              </label>
              <input
                type="text"
                name="optionC"
                value={formData.optionC}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Option C"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <i className="fa-regular fa-square me-2"></i> Option D
              </label>
              <input
                type="text"
                name="optionD"
                value={formData.optionD}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Option D"
              />
            </div>

            {/* Correct Answer */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <i className="fa-solid fa-check-double me-2"></i> Correct Answer
              </label>
              <input
                type="text"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Type the FULL correct option text"
              />
              <span style={styles.helperText}>Type the full text of the correct option.</span>
            </div>

            {/* Subject */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <i className="fa-solid fa-book me-2"></i> Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select subject</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" style={styles.button}>
            <i className={`fa-solid ${editForm ? 'fa-check' : 'fa-plus'} me-1`} />
            {editForm ? 'Update Question' : 'Add Question'}
          </button>
        </form>
      </div>

      {/* Table Heading Bar */}
      <div style={styles.listHeadingBar}>
        <h3 style={styles.listHeading}>
          <i className="fa-solid fa-table-list me-2"></i>
          Question List
        </h3>
      </div>

      {/* Table Container */}
      <div style={styles.tableContainerOuter}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Question</th>
              <th style={styles.th}>Option A</th>
              <th style={styles.th}>Option B</th>
              <th style={styles.th}>Option C</th>
              <th style={styles.th}>Option D</th>
              <th style={styles.th}>Correct Answer</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((q, index) => (
                <tr key={q._id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{q.questionText}</td>
                  <td style={styles.td}>{q.optionA}</td>
                  <td style={styles.td}>{q.optionB}</td>
                  <td style={styles.td}>{q.optionC}</td>
                  <td style={styles.td}>{q.optionD}</td>
                  <td style={styles.td}>{q.correctAnswer}</td>
                  <td style={styles.td}>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(q._id)}>
                      Delete
                    </button>
                    <button style={styles.editBtn} onClick={() => handleEdit(q)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="8" className="text-center text-muted">
                  No questions added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles: glass, gradients, grid-form, wide card/table
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
    color: '#fff',
    textShadow: '1px 2px 50px #6ba2a9ae',
    letterSpacing: ".5px",
    fontWeight: 'bold',
    fontSize: '2rem',
    textAlign: "center"
  },
  card: {
    background: "linear-gradient(145deg, #0e556a62, #00000068)",
    borderRadius: '18px',
    padding: '36px 38px 28px 38px',
    maxWidth: '1150px',
    margin: '0 auto 30px auto',
    border: "1.5px solid #1398be30",
    backdropFilter: "blur(13px)"
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '28px',
    rowGap: '0px',
    marginBottom: '17px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '19px',
  },
  formGroupWide: {
    gridColumn: '1 / span 3',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '7px',
    fontWeight: 'bold',
    color: '#000000ff',
    fontSize: '18px',
    letterSpacing: ".6px"
  },
  helperText: {
    fontSize: "0.97rem",
    color: "#01859c",
    marginTop: "2px"
  },
  input: {
    width: '100%',
    padding: '11px 13px',
    borderRadius: '11px',
    border: '1.5px solid #1cdfdf99',
    background: 'linear-gradient(135deg, #a3f2f8f8, #fffffff8, #a3f2f8d8)',
    color: '#000000ff',
    fontSize: "1.05rem",
    outline: 'none',
    fontWeight: "bold"
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
    letterSpacing: ".2px",
    boxShadow: "0 1px 10px #3cf7f359",
    marginTop: 8,
    transition: "0.2s"
  },
  listHeadingBar: {
    width: "100%",
    margin: "30px auto 8px",
    background: "linear-gradient(145deg, #0d1f25, #000000)",
    borderRadius: "13px",
    boxShadow: "0 1.5px 9px #13dbc8a5",
    padding: "8px 0 5px"
  },
  listHeading: {
    color: "#fff",
    margin: 0,
    fontWeight: 'bold',
    fontSize: "1.45rem",
    textAlign: "center",
    textShadow: "0 1.5px 5px #044f5f80"
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
    minWidth: "900px",
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
    fontSize: "1.07rem",
    color: "#d7faff"
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
    fontSize: "1.04rem",
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
    fontSize: "1.04rem",
    transition: '0.18s',
  }
};

export default QuestionBank;
