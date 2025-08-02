const Admin =require ('../models/Admin')
const express=require('express')
const router=express.Router();
router.post('/', async (req,res)=>{
    const admin=await new Admin(req.body);
    admin.save();
    return res.status(200).json({message: 'Admin route is working'});
})
// Login route for admin
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const admin = await Admin.findOne({email: email});
    if(admin.password == password){
        return res.json({message: 'Login Successfully', admin:{
            role:'admin',
            id: admin._id,
            email: admin,email

        }})
    }
    else{
        return res.json({message: 'Invalid Credentials'});
    }
    return res.json(admin);
})

module.exports = router;