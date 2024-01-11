const User = require('../models/User');

const getUserDetail = async (req, res) => {
    console.log("in getUserDetail");
    try {
        
        const id = req.params.id;
        console.log(id);
        
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

const updateUserDetail = async (req, res) => {
    try {
        console.log("in updateUserDetail");
        const{id,firstName,lastName,profileImage} = req.body;
        console.log(req.body);
        const updatedUser = await User.findByIdAndUpdate(id, { firstName, lastName, profileImage }, { new: true });
        console.log(updatedUser);
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports ={getUserDetail,updateUserDetail,deleteUser };