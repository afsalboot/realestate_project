const  argon  = require('argon2')
const User = require('../models/user.schema')

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

    try{
        const user = await User.findById(id)
       return res.status(200).json({UserbyId:user})
    }catch(err){
        console.log("Get User ERROR:",err.message)
        return res.status(500).json({message:"Failed to get users"})
    }
}


const updateUser = async (req, res) => {
    console.log("Hello")
    const id = req.params.id;
    // const tokenUserId = req.userId;
    const { password, avatar } = req.body;

    console.log(id, password, avatar)

    // if (id !== tokenUserId) {
    //     return res.status(403).json({ message: "Not Authorized" });
    // }

    try {
        let updatedPassword = null;

        if (password) {
            updatedPassword = await argon.hash(password);
        }

        // Define updateData to include password and avatar
        const updateData = {
            ...(updatedPassword && { password: updatedPassword }),
            ...(avatar && { avatar })
        };

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        console.log("Updated user", updatedUser);

        return res.status(200).json({ updatedUser });
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