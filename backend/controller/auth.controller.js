const argon = require('argon2');
const User = require('../models/user.schema')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const register = async (req,res) =>{
    console.log('Third check',req.body)
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

const login = async (req, res) => {

    try {
        const userLogin = await User.findOne({ username: req.body.username })
        console.log("userLogin", userLogin);

        if (!userLogin) {
            return res.status(401).json("Invalid mail")
        }

        if (await argon.verify(userLogin.password, req.body.password)) {
            const token = jwt.sign({
                 id: userLogin._id 
                }, process.env.JWT_SECRET, {
                     expiresIn: '1d' 
                    })

            console.log("token***", token);

            const { password, ...userWithoutPassword } = userLogin._doc;

            return res.status(200).json({  ...userWithoutPassword, token: token, message: "Login successful" });
        } else {
            return res.status(401).json("Invalid password")
        }
    } catch (err) {
        console.log("login error:",err.message)
        return res.status(500).json({message: "Failed to login"})
    }
}

const logout = (req,res) =>{
    res.clearCookie("token").status(200).json({message: "Logout Successful"})
}

module.exports = {register,login,logout}