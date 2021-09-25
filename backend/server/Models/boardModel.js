const mongoose = require("mongoose")
const {Schema} = mongoose

//TODO: Remove List from schema
const boardSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    owenerId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'user'
    },
    list:{
        type:[Schema.Types.ObjectId],
        uniqueItems:true,
        ref: 'list'
    }
}, {timestamps:true})

const Board = mongoose.model('board', boardSchema)

module.exports = {
    Board
}