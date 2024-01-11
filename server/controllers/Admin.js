const User = require('../models/User');

const getUsersDetails = async(req,res) =>{
    try {
        if(req.user.role !== 'admin'){
            return res.status(400).json({message:"Admin resources access denied"})
        }
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const updateUserDetails = async(req,res) =>{
    try {
        if(req.user.role !== 'admin'){
            return res.status(400).json({message:"Admin resources access denied"})
        }
        const {id,name,profileImage,role} = req.body;
        const updatedUser = await User.findByIdAndUpdate(id,{name,profileImage,role},{new:true});
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const deleteUser = async(req,res) =>{
    try {
        if(req.user.role !== 'admin'){
            return res.status(400).json({message:"Admin resources access denied"})
        }
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.json({message:"User deleted successfully"});
    } catch (error) {
        
    }
}

module.exports = {getUsersDetails,updateUserDetails,deleteUser};