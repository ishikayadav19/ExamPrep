const express = require('express');
const router = express.Router();
const subject = require('../models/Subject');

router.post('/', async (req, res) => {
    const newSubject = new subject(req.body);
    await newSubject.save();
    return res.json({message:"Subject Added Successfully"});

})

router.get('/', async(req, res) => {
    const subjects = await subject.find();
    return res.json({data:subjects});
});

router.delete('/:id',async (req,res)=>{
    const {id} = req.params
    const deletedSubject = await subject.findByIdAndDelete(id);
    return res.json({message:"Deleted Successfully"})
})
module.exports = router