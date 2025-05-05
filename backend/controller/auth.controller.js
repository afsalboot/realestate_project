const argon = require('argon2');
const User = require('../models/user.schema')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const register = async (req,res) =>{
    const{ username, email, password } = req.body;


    try{
    //HASH THE PASSWORD
    const hashPassword = await argon.hash(password)
    //create new user and save
    const newUser = await User.create({
        username, 
        email, 
        password: hashPassword
    })
    console.log(newUser) 
    return res.status(201).json({message: "User created successfully"})
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: "Failed to create user"})
    }
   
}

const login = async (req,res) =>{
 const {username,password} = req.body
try{

    //check if the user exists
    const user = await User.findOne({username})
    if(!user){
        console.log("user name missmatched")
        return res.status(401).json({ message: 'Invalid email or password' });  
    }

    //check the password is correct
    const isMatch = await argon.verify(user.password, password)
    if(!isMatch){
        console.log("password missmatched")
        return res.status(400).json({ message: 'Invalid email or password' });  
    }
    console.log("login user details", user)
    //generate cookie token and send to user

    const age = 1000 * 60 * 60 * 24 * 7

    const token = jwt.sign(
        {
        id: user._id, username: user.username,
        isAdmin: false,
        }
    ,process.env.JWT_SECRET,{expiresIn: age})

    const { password: hashedPassword, ...userData } = user._doc;

    return res.cookie("token", token,{
        httpOnly:true,
        // secure:true,
        maxAge: age
    }).status(200).json({ user:userData })
}catch(err){
    console.log("user login error",err.message)
    return res.status(500).json({message: "login failed"})
}
}

const logout = (req,res) =>{
    res.clearCookie("token").status(200).json({message: "Logout Successful"})
}

module.exports = {register,login,logout}