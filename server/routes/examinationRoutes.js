const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Examination = require('../models/Examination');
const mongoose = require('mongoose');

// POST: Create a new exam
router.post('/', async (req, res) => {
  console.log("Incoming body:", req.body);

  try {
    const {
      examName,
      date,
      time,
      duration,
      totalMarks,
      passingMarks,
      sessionId,
      status,
      questionDistribution
    } = req.body;

    // Validate required fields
    if (!examName || !date || !time || !duration || !totalMarks || !passingMarks || !sessionId || !questionDistribution) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate sessionId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: `Invalid session ID: ${sessionId}` });
    }

    const selectedQuestions = [];

    // Validate questionDistribution and fetch questions
    for (const dist of questionDistribution) {
      const { subject, numberOfQuestions } = dist;
      const questionCount = parseInt(numberOfQuestions);

      if (!mongoose.Types.ObjectId.isValid(subject)) {
        return res.status(400).json({ error: `Invalid subject ID: ${subject}` });
      }

      if (isNaN(questionCount) || questionCount <= 0) {
        return res.status(400).json({ error: `Invalid number of questions for subject: ${subject}` });
      }

      const questions = await Question.aggregate([
        { $match: { subject: new mongoose.Types.ObjectId(subject) } },
        { $sample: { size: questionCount } }
      ]);

      if (questions.length < questionCount) {
        return res.status(400).json({ error: `Not enough questions available for subject: ${subject}` });
      }

      selectedQuestions.push(...questions.map(q => q._id));
    }

    const newExam = new Examination({
      title: examName,
      date,
      time,
      duration,
      totalMarks,
      passingMarks,
      sessionId,
      status: status || 'Scheduled',
      questionDistribution: questionDistribution.map(d => ({
        subject: d.subject,
        questionCount: parseInt(d.numberOfQuestions)
      })),
      questions: selectedQuestions
    });

    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (err) {
    console.error('Error creating exam:', err);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// GET: Fetch all exams
router.get('/', async (req, res) => {
  try {
    const exams = await Examination.find({}, 'title date time status')
      .populate('sessionId', 'name')
      .populate('questionDistribution.subject', 'name');
    res.json(exams);
  } catch (err) {
    console.error('Error fetching exams:', err);
    res.status(500).json({ error: 'Error fetching exams' });
  }
});

// PUT: Update an exam
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid exam ID: ${id}` });
    }

    const updatedExam = await Examination.findByIdAndUpdate(id, req.body, { new: true })
      .populate('sessionId', 'name')
      .populate('questionDistribution.subject', 'name');

    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json(updatedExam);
  } catch (err) {
    console.error('Error updating exam:', err);
    res.status(400).json({ error: 'Error updating exam' });
  }
});

// DELETE: Delete an exam
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid exam ID: ${id}` });
    }

    const deletedExam = await Examination.findByIdAndDelete(id);
    if (!deletedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    console.error('Error deleting exam:', err);
    res.status(500).json({ error: 'Error deleting exam' });
  }
});

// GET: Fetch questions for a specific exam
router.get('/exam/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ error: `Invalid exam ID: ${examId}` });
    }

    const exam = await Examination.findById(examId)
      .populate('questionDistribution.subject', 'name')
      .populate('questions');

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const allQuestions = [];

    for (const dist of exam.questionDistribution) {
      const subjectId = dist.subject._id;
      const questionCount = dist.questionCount;

      const questions = await Question.aggregate([
        { $match: { subject: new mongoose.Types.ObjectId(subjectId) } },
        { $sample: { size: questionCount } }
      ]);

      if (questions.length < questionCount) {
        return res.status(400).json({ error: `Not enough questions for subject: ${subjectId}` });
      }

      allQuestions.push(...questions);
    }

    return res.json({
      exam: {
        title: exam.title,
        date: exam.date,
        time: exam.time,
        duration: exam.duration,
        totalMarks: exam.totalMarks,
        passingMarks: exam.passingMarks,
        status: exam.status
      },
      questions: allQuestions
    });
  } catch (err) {
    console.error('Error fetching exam questions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;