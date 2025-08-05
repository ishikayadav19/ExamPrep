import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Examination = () => {
  const [formData, setFormData] = useState({
    examName: '',
    date: '',
    time: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    sessionId: '',
    status: 'Scheduled',
    questionDistribution: [{ subject: '', numberOfQuestions: '' }],
  });
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, sessionRes] = await Promise.all([
          axios.get('http://localhost:5000/api/subject'),
          axios.get('http://localhost:5000/api/session'),
        ]);
        setSubjects(subjectRes.data.data || []);
        setSessions(sessionRes.data.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load subjects or sessions');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuestionDistChange = (index, e) => {
    const updated = [...formData.questionDistribution];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questionDistribution: updated });
    setError('');
  };

  const addDistributionField = () => {
    setFormData({
      ...formData,
      questionDistribution: [...formData.questionDistribution, { subject: '', numberOfQuestions: '' }],
    });
  };

  const removeDistributionField = (index) => {
    if (formData.questionDistribution.length === 1) {
      setError('At least one subject is required');
      return;
    }
    const updated = [...formData.questionDistribution];
    updated.splice(index, 1);
    setFormData({ ...formData, questionDistribution: updated });
  };

  const validateForm = () => {
    if (
      !formData.examName ||
      !formData.date ||
      !formData.time ||
      !formData.duration ||
      !formData.totalMarks ||
      !formData.passingMarks ||
      !formData.sessionId
    ) {
      return 'All fields are required';
    }
    if (parseInt(formData.passingMarks) > parseInt(formData.totalMarks)) {
      return 'Passing marks cannot exceed total marks';
    }
    if (
      formData.questionDistribution.some(
        (dist) =>
          !dist.subject || !dist.numberOfQuestions || parseInt(dist.numberOfQuestions) <= 0
      )
    ) {
      return 'All question distributions must have a valid subject and number of questions';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/exams', formData);
      alert('Exam Created Successfully');
      setFormData({
        examName: '',
        date: '',
        time: '',
        duration: '',
        totalMarks: '',
        passingMarks: '',
        sessionId: '',
        status: 'Scheduled',
        questionDistribution: [{ subject: '', numberOfQuestions: '' }],
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.error || 'Error submitting form');
    }
  };

  return (
    <div style={styles.page}>
      {/* Heading Bar */}
      <div style={styles.headingBar}>
        <h1 style={styles.heading}>
          <i className="fa-solid fa-file-pen" style={{ marginRight: 10 }} />
          Create Examination
        </h1>
      </div>

      {/* Form Card */}
      <div style={styles.card}>
        {error && <div style={styles.alert}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Exam Name</label>
              <input
                type="text"
                name="examName"
                value={formData.examName}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Enter exam name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Exam duration"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Total Marks</label>
              <input
                type="number"
                min="1"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Total marks"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Passing Marks</label>
              <input
                type="number"
                min="1"
                name="passingMarks"
                value={formData.passingMarks}
                onChange={handleChange}
                style={styles.input}
                required
                placeholder="Passing marks"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Session</label>
              <select
                name="sessionId"
                value={formData.sessionId}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select Session</option>
                {sessions.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <hr style={{ margin: '24px 0', borderColor: '#1398be70' }} />

          <h4 style={{ color: '#fff', marginBottom: 14 }}>Question Distribution</h4>
          {formData.questionDistribution.map((item, index) => (
            <div style={styles.distRow} key={index}>
              <select
                name="subject"
                value={item.subject}
                onChange={(e) => handleQuestionDistChange(index, e)}
                style={styles.distSelect}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="numberOfQuestions"
                placeholder="No. of Questions"
                value={item.numberOfQuestions}
                onChange={(e) => handleQuestionDistChange(index, e)}
                min="1"
                required
                style={styles.distInput}
              />

              <button
                type="button"
                onClick={() => removeDistributionField(index)}
                style={styles.removeBtn}
                title="Remove"
              >
                &times;
              </button>
            </div>
          ))}

          <button type="button" onClick={addDistributionField} style={styles.addBtn}>
            + Add Subject
          </button>

          <button type="submit" style={styles.button}>
            Create Exam
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #a3f2f8c4, #ffffffff, #a3f2f8c4)',
    padding: '30px 12px',
    fontFamily: 'sans-serif',
  },
  headingBar: {
    width: '100%',
    margin: '0 auto 30px auto',
    background: 'linear-gradient(145deg, #0d1f25, #000000)',
    borderRadius: '14px',
    padding: '12px 0 8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    margin: 0,
    color: '#fff',
    textShadow: '1px 2px 50px #6ba2a9ae',
    letterSpacing: '.5px',
    fontWeight: 'bold',
    fontSize: '2rem',
    textAlign: 'center',
  },
  card: {
    background: 'linear-gradient(145deg, #0e556a62, #00000068)',
    borderRadius: '18px',
    padding: '36px 38px 32px 38px',
    maxWidth: '950px',
    margin: '0 auto',
    border: '1.5px solid #1398be30',
    backdropFilter: 'blur(13px)',
  },
  alert: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: "0 1px 10px #f1373733"
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
    gap: '22px 30px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '7px',
    fontWeight: 'bold',
    color: '#000000ff',
    fontSize: '18px',
    letterSpacing: '.6px',
  },
  input: {
    padding: '11px 13px',
    borderRadius: '11px',
    border: '1.5px solid #1cdfdf99',
    background: 'linear-gradient(135deg, #a3f2f8f8, #fffffff8, #a3f2f8d8)',
    color: '#000000ff',
    fontSize: '1.05rem',
    outline: 'none',
    fontWeight: 'bold',
  },
  distRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '14px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  distSelect: {
    flex: '1 1 50%',
    padding: '11px 13px',
    borderRadius: '11px',
    border: '1.5px solid #1cdfdf99',
    background: 'linear-gradient(135deg, #a3f2f8f8, #fffffff8, #a3f2f8d8)',
    color: '#000000ff',
    fontSize: '1.05rem',
    fontWeight: 'bold',
    outline: 'none',
  },
  distInput: {
    flex: '1 1 30%',
    padding: '11px 13px',
    borderRadius: '11px',
    border: '1.5px solid #1cdfdf99',
    background: 'linear-gradient(135deg, #a3f2f8f8, #fffffff8, #a3f2f8d8)',
    color: '#000000ff',
    fontSize: '1.05rem',
    fontWeight: 'bold',
    outline: 'none',
  },
  removeBtn: {
    flex: '0 0 40px',
    background: 'transparent',
    fontWeight: 'bold',
    color: '#ff4d4d',
    border: '1.5px solid #ff4d4d',
    borderRadius: '8px',
    fontSize: '1.5rem',
    lineHeight: '0.8',
    cursor: 'pointer',
    transition: '0.18s',
    padding: '0 6px',
  },
  addBtn: {
    marginBottom: '18px',
    background: 'linear-gradient(145deg, #0d1f25, #000000)',
    color: '#fff',
    borderRadius: '10px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '10px 18px',
    boxShadow: '0 1px 10px #3cf7f359',
    transition: '0.2s',
  },
  button: {
    width: '100%',
    background: 'linear-gradient(145deg, #0d1f25, #000000)',
    color: '#fff',
    padding: '13px 0 12px',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    cursor: 'pointer',
    letterSpacing: '.2px',
    boxShadow: '0 1px 10px #3cf7f359',
    marginTop: 8,
    transition: '0.2s',
  },
};

export default Examination;
