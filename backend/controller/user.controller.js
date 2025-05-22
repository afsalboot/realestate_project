const  argon  = require('argon2')
const User = require('../models/user.schema')
const cloudinary = require('cloudinary').v2



cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET
});




const getUsers = async (req,res) => {
    try{
        console.log("first check")
        const users = await User.find()
        console.log("scond check",users)
       return res.status(200).json({users:users})
    }catch(err){
        console.log("Get User ERROR:",err.message)
        return res.status(500).json({message:"Failed to get users"})
    }
}


const getUser = async (req,res) => {
    const id = req.params.id;

    console.log("id****####",id);

    try{
        const user = await User.findById(id)
       return res.status(200).json({UserbyId:user})
    }catch(err){
        console.log("Get User ERROR:",err.message)
        return res.status(500).json({message:"Failed to get users"})
    }
}


const updateUser = async (req, res) => {

           console.log("update user second check",req.body)
    try {
        
        
        const { password, ...updateFields } = req.body;


        if (req.file) {
            const hostedImage = await cloudinary.uploader.upload(req.file.path);
            updateFields.avatar = hostedImage.secure_url;
        } else {
            updateFields.avatar = undefined
        }


        if (password) {
            const hashedPassword = await argon.hash(password);
            updateFields.password = hashedPassword;  
        }
        
        console.log("third check",updateFields)

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, {new: true})

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log('4th check',updateUser)

        const { password: exposedPassword, ...userWithoutPassword } = updatedUser._doc

        return res.status(200).json( userWithoutPassword );
    } catch (err) {
        console.log("Update User ERROR:", err.message);
        return res.status(500).json({ message: "Failed to update user" });
    }
};





const deleteUser = async (req,res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    } 

    try{

        const deleteUser = await User.findByIdAndDelete(id)

        return res.status(200).json({message: "User Deleted"})
      
    }catch(err){
        console.log("Get User ERROR:",err.message)
        return res.status(500).json({message:"Failed to delete users!"})
    }
}

module.exports = { getUsers,getUser,updateUser,deleteUser }