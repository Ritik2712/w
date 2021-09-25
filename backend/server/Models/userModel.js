const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        fName:{
            type:String,
            required:true,
        },
        lName:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
            unique:true  
        },
        password:{
            type:String,
            required:true,
            minlength:5
        },
        img:{
            type:String
        },
        boardId:{
            type:[Schema.Types.ObjectId],
            uniqueItems:true,
            ref:'board'
        }
    }
)

const User = mongoose.model('user', userSchema)

module.exports = {
    User
}