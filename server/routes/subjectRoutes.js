const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

router.post('/', async (req, res) => {
    const subject = new Subject(req.body);
    subject.save();
    return res.json({message:"Subject Added Successfully"});

})

router.get('/', async(req, res) => {
    const subjects = await Subject.find();
    return res.json({data:subjects});
});

router.delete('/:id',async (req,res)=>{
    const {id} = req.params
    const subject = await Subject.findByIdAndDelete(id);
    // session.save();
    return res.json({message:"Deleted Successfully"})
})
router.put('/:id',async(req,res)=>{
    const {id} = req.params
    const subject = await Subject.findByIdAndUpdate(id,req.body)
    return res.json({message:"Updated Successfully"})
})


module.exports = router