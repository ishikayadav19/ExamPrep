const user = require('../models/Examinee'); // Examinee model ko import kr liya
const express = require('express'); // express ko import kr liya
const router = express.Router(); // express ka router bana liya kyuki routes define krne hain

router.get('/',async(req,res)=>{
    return res.json("Api call successful"); // GET request par response de diya, jaise hi koi GET request karega, yeh response milega
});

router.post('/', async (req,res)=>{
   const examinee=await new Examinee(req.body);
    examinee.save();
    return res.status(200).json({message: 'Examinee route is working'});
})
module.exports = router; // router ko export kr diya taaki isse use kiya ja sake kisi aur file mein

