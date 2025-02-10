import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// made tokens 
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// Login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User DoesNot Exists"})
        }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false,message:"Invalid Credentials"})
    }

    const token =createToken(user._id)
    res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


//Register user
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    console.log("Request body: ", req.body); // Check incoming data
    try {
        // to check if user already exists or not 
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User Already Exists"})
        }
        // validating email and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a Valid Email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please Enter a Strong Password"})
        }

    // before creating the account we will encrypt the password
    // hashing user password
        const salt=await bcrypt.genSalt(10)// bcrypt kiya 10 words ka strong password ayega 
        const hashedPassword=await bcrypt.hash(password,salt)
        // create new user
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        //save this user in the database
        const user=await newUser.save()
        // generating access and refresh tokens 
        const token =createToken(user._id)
        res.json({ success: true, token });

    
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {
    loginUser,
    registerUser
}