const express = require('express'); //server bna deta h
const cors = require('cors'); //cors se cross-origin requests allow hote hain , middleware hota hai
const mongoose = require('mongoose');

const app = express(); //express ka instance bna liya
app.use(cors()); //cors ko use kr liya
app.use(express.json()); //json data ko parse krne ke liye

// MongoDB connection
const URL = 'mongodb://localhost:27017/examPrep'; // MongoDB ka URL => DATABASE NAME = examPrep agagr hai to use krlega or ni h to bna dega
mongoose.connect(URL)
    .then(()=>{
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    });
//apis started
app.use('/api/examinee',require('./routes/examineeRoutes')); //examinee routes ko use kr liya
//admin api
app.use('/api/admin',require('./routes/adminRoutes')); //admin routes ko use kr liya
//session api
app.use('/api/session/',require('./routes/sessionRoutes')); //session routes ko use kr liya
//api ended

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})