const { Board } = require("../Models/boardModel")
const { User } = require("../Models/userModel")
const jwt = require('jsonwebtoken')

//TODO: Improve retirn response 

//Creating a controller to Create new user 
const registerNewUser = async (req, res)=>{
    console.log(req.body)
    const {email, username, password,fName,lName} = req.body
    try{
        //Find if email alredy exist
        const emailExists = await User.findOne({email})
        if (emailExists){
            console.log(emailExists)
            return res.status(200).json({msg: "Email already registered", status:"email"})
        }
        //Find if userName alredy exists
        const userExists = await User.findOne({username})
        if(userExists){
            return res.status(200).json({msg:"User alredy eists", status:"user"})
        }
        //Create newUser 
        const newUser = new User({"email" : email,"fName":fName,"lName":lName, "username": username, "password": password})
        newUser.save()
        .then((response)=>{
            //console.log(process.env.SECRET_KEY);
            const TOKEN = jwt.sign(newUser.toJSON(),process.env.SECRET_KEY)
            return res.send({ email: response.email, userId: response._id, boardId: [],token:TOKEN })
        })
        .catch((err)=>{
            console.log(err)
            return res.status(400).json({msg:"Some error occured"})
        })
    }catch (err){
        console.log(err)
        return res.status(400).json({msg:'Some error occured'})
    }
}



//Creating controller to validate user login
const loginUser = async(req, res) =>{
    const {email, password} = req.body

    const userDetail = await User.findOne({email})
    if(userDetail){
        if(userDetail.password === password){
            const TOKEN = jwt.sign(userDetail.toJSON(),process.env.SECRET_KEY)
            return res.json({userId:userDetail._id, email:userDetail.email, boardId:userDetail.boardId,token:TOKEN})   
        }else{
            return res.json({msg:"Wrong Password", status:"password"})
        }
    }else{
        return res.json({msg:"wrong email"})
    }
}

const registerWithBoard = async(req, res)=>{
    // console.log(req.body)
    const {boardId} = req.params
    const {email, username, password} = req.body
    
    try{
        //Find if email alredy exist
        const emailExists = await User.findOne({email})
        if (emailExists){
            console.log(emailExists)
            console.log("Hell")
            return res.status(200).json({msg: "Email already registered", status:"email"})
        }
        
        //Find if userName alredy exists
        const userExists = await User.findOne({username})
        if(userExists){
            return res.status(200).json({msg:"User alredy eists", status:"user"})
        }
        const boardExists = await Board.findById(boardId)
        if(!boardExists){
            res.status(200).json({msg:"Board does not Exit."})
        }
        

        //Create newUser 
        const newUser = new User({"email" : email, "username": username, "password": password, boardId:[boardId]})
        newUser.save()
        .then((response)=>{
            return res.send({ username: response.username, userId: response._id, boardId: [boardId] })
        })
        .catch((err)=>{
            console.log(err)
            return res.status(400).json({msg:'Some error occured'})
        })
        
    }catch (err){
        console.log(err)
        return res.status(400).json({msg:'Some error occured'})
    }
}

//give current user boardlist
const getBoardList = async (req, res)=>{
    const id = req.params.boardId
    const user = await User.findById(id)
    if(user){
        return res.status(200).json({boards:user.boardId})
    }else{
        return res.status(400).json({msg:"User not found"})
    }
}
module.exports = {
    registerNewUser,
    loginUser,
    registerWithBoard,
    getBoardList
}