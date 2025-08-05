const Examinee=require('../models/Examinee');
const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{   //it will  be used when we get the "get" request
     const examinee= await Examinee.find();
     return res.json({data: examinee});
})


router.post('/', async (req,res)=>{
   const examinee=await new Examinee(req.body);
    examinee.save();
    return res.json({message: 'Examinee route is working'});
})
router.delete('/:id',async(req,res)=>{
    const {id}=req.params
    const examinee=await Examinee.findByIdAndDelete(id);

    return res.json({message:"deleted successfully"});
})
router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const examinee=await Examinee.findByIdAndUpdate(id,req.body)
    return res.json({message:"examinee updated successfully"});
})
module.exports=router;     //because we want to use this router in other files that's why we use exports