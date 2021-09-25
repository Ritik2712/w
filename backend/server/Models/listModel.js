const mongoose = require("mongoose")
const {Schema} = mongoose

const listSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    order:{
        type:String,
        required:true
    },
    boardId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'board'
    }
})

const List = mongoose.model('list', listSchema)

module.exports = {
    List
}