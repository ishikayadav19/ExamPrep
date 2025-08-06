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

// // Change Password route - must be above router.put('/:id', ...)
router.put('/change', async (req, res) => {
  try {
    const { op, np, cnp, email } = req.body;

    // Validate mandatory fields
    if (!op || !np || !cnp || !email) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (np !== cnp) {
      return res.status(400).json({ success: false, message: "New password and confirm password do not match." });
    }

    if (op === np) {
      return res.status(400).json({ success: false, message: "New password must be different from old password." });
    }

    // Find the user by email
    const examinee = await Examinee.findOne({ email });
    if (!examinee) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare current (old) password as plain text
    if (examinee.password !== op) {
      return res.status(400).json({ success: false, message: "Current password is incorrect." });
    }

    // Update password in DB directly
    examinee.password = np; // new password as plain text
    await examinee.save();

    return res.status(200).json({ success: true, message: "Password changed successfully." });

  } catch (error) {
    console.error("Password change error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});


router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const examinee=await Examinee.findByIdAndUpdate(id,req.body)
    return res.json({message:"examinee updated successfully"});
})


router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const examinee = await Examinee.findOne({email:email,})
    if (!examinee) {
        return res.json({ message: 'Your Email is Incorrect' });
    }
    if (examinee.password == password) {
        return res.json({ message: 'Login successfully',user:{
            email: examinee.email,
            role: "user",
            id: examinee._id
        } });
        
    } else {
        return res.json({ message: 'Your Password is Incorrect' });
    }
});






module.exports=router;     //because we want to use this router in other files that's why we use exports