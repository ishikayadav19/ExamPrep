const Admin =require ('../models/Admin')
const express=require('express')
const router=express.Router();
router.post('/', async (req,res)=>{
    const admin=await new Admin(req.body);
    admin.save();
    return res.status(200).json({message: 'Admin route is working'});
})

router.post('/',async(req,res)=>{
    const {email,password}=req.body;
    const admin = await Admin.findOne({email: email});
    return res.json(admin);
})

module.exports = router;