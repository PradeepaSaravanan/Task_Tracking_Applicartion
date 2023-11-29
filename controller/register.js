const User = require('../models/register');
const Admin=require('../models/admin');
const bcrypt = require('bcrypt')
const { hash, compare } = require("bcryptjs");

const { sign } = require("jsonwebtoken");
exports.register = async (req, res) => {
    const { username, email, password} = req.body;
    try {
      const userObj = { username, email};
      const hashPwd = await hash(password, 12);
      userObj.password = hashPwd;
     // console.log(new User(userObj))
      const user = await new User(userObj).save();
      console.log(user);
  
      const token = sign({[email]:user},"Pradeeepa@23090978648374", { expiresIn: 360000 }); 
      return res.status(200).json({ message: 'Registration successful', token });  
    } catch (error) {
      console.error(error);
      return res.status(500).json({error:"Internal server error"});
    }
  };


  exports.login = async (req, res) => {
    // const { username, hash_password } = req.body;
    const username=req.body.username;
    const pwd=req.body.password;
  
    try {
      const user = await User.findOne({ username }).lean();
      if (!user) return res.status(404).send("Invalid credentials");
      // if (user.role !== "user")
      //   return res.status(404).send("Invalid credentials..");
      const isMatch = await compare(pwd, user.password);
      console.log(isMatch);
      if (!isMatch) return res.status(400).send("Invalid credentials");
     
      //sign( payload1, process.env.JWT_SECRET, { expiresIn: 360000 }, function (err, token) {
      //res.status(200).json({ "token": token });
  
      const token=sign({user},"Pradeeepa@23090978648374",{expiresIn:360000});
      return res.status(200).json(token);
  
      // console.log(token);
      
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  
  

  exports.getAuthUser = async (req, res, next) => {
    try { 
      const user = await User.findById(req?.user?._id).select("-password").lean();  
      if (!user)  
        return res.status(400).send("User not found, Authorization denied..");  
      return res.status(200).json({ ...user });  
    } catch (error) {  
      return res.status(500).send(error.message);  
    }
  
  };


  
  exports.adminlogin = async (req, res) => {
    // const { username, hash_password } = req.body;
    const email=req.body.email;
    const pwd=req.body.password;
    console.log(pwd)
  
    try {

      const admin = await Admin.findOne({username:email}).lean();
      console.log(admin)
      if (!admin) return res.status(404).send("Invalid credentials");
      // if (user.role !== "user")
      //   return res.status(404).send("Invalid credentials..");
      const isMatch = await compare(pwd, admin.password);
      console.log(isMatch);
      if (!isMatch) return res.status(400).send("Invalid credentials");
      const token=sign({admin},"Pradeeepa@23090978648374",{expiresIn:360000});
      return res.status(200).json(token);
      
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }


  exports.getAdminAuthUser = async (req, res, next) => {
    try { 
      const admin = await Admin.findById(req?.admin?._id).select("-password").lean();  
      if (!admin)  
        return res.status(400).send(" Admin not found, Authorization denied..");  
      return res.status(200).json({ ...admin });  
    } catch (error) {  
      return res.status(500).send(error.message);  
    }
  
  };
  

  
  