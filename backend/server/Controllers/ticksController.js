const { User } = require("../Models/userModel")

// Update ticks

const showTicks = async(req,res) => {
    const {email, boardId} = req.body;
    const ticks = await User.findOneAndUpdate({})
}