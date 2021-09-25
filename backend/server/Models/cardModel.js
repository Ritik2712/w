const mongoose = require("mongoose")
const {Schema} = mongoose

const cardSchema = new Schema({
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
    },
    listId:{
        type:Schema.Types.ObjectId,
        requied:true,
        ref:'list'
    }
})

const Card = mongoose.model('card', cardSchema)

module.exports = {
    Card
}