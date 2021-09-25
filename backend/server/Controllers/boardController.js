const { User } = require("../Models/userModel")
const { Board } = require("../Models/boardModel")
const { List } = require("../Models/listModel")
const {Card} = require("../Models/cardModel")
const nodemailer = require("nodemailer")


//Creating new board based on userId
const createBoard = async(req, res)=>{
    const {title, userId } = req.body
    
    try{
        const newBoard = new Board({
            "title":title,
            "owenerId":userId
        })
        newBoard.save()
        .then(async(response)=>{
            //Update the user's boardId feild.
            if(response){
                const addBoardInfo = await User.updateOne({_id:userId}, {
                    $addToSet : {boardId: [response._id]}
                })
                if(addBoardInfo){
                    return res.json({boardId: response._id, title: response.title, owenerId: response.owenerId,createdAt: response.createdAt})
                }
            }
        })
        .catch((err)=>{
            console.log(err)
            return res.status(400).send(err)
        })
    }catch(err){
        return res.send(err)
    }
}

//Deleting Board Details
const delBoard = async(req, res)=>{
    const _id = req.params._id
    const board = await Board.findOneAndDelete(_id)
    if(!board){
        return res.status(400).send()
    }
    const list = await List.deleteMany({boardId:_id})
    // if(!list){
    //     return res.status(400).send()
    // }
    const card = await Card.deleteMany({boardId:_id})
    // if(!card){
    //     return res.status(400).send()
    // }
    return res.status(200).json({msg: "ALL ITEMS DELETED"})
}

//Getting Board Details
const getBoard = (req, res)=>{
    const {boardId} = req.params
    console.log(boardId)
    Board.findById(boardId, function(err, response){
        if(response){

            return res.json({boardId:response._id, title:response.title, owenerId:response.owenerId, createdAt: response.createdAt})
        }
        else{
            return res.json({'msg': "No board found"})
        }
    })
}


//Updating Board Details
//sendong mails
const sendMail = async(email, boardId="123")=>{
    // const testAccount = await nodemailer.createTestAccount()
    const config = {
        host: "in-v3.mailjet.com",
        port: 587,
        secureConnection: false,
        secure: false, // true for 465, false for other ports
        tls: {
            ciphers:'SSLv3'
        },
        auth: {
          user: "93d5266893ac8f0927cd85075c05af8c", 
          pass: 'f40d61226bb308f1f0d1b68a969b1316',
        },
    }
    let transporter = nodemailer.createTransport(config);
    let info
    if (boardId === "123"){
        info = await transporter.sendMail({
            from: 'info@engagenreap.com', // sender address
            to: email, // list of receivers
            subject: "New Board Acess✔", // Subject line
            text: "Admin has Invite you to join New Board. Join by URL http://161.97.79.224:1945/sign-in", // plain text body
            html: "<a>http://161.97.79.224:1945/sign-in</a>", // html body
        });   
    }else{
        info = await transporter.sendMail({
            from: 'info@engagenreap.com', // sender address
            to: email, // list of receivers
            subject: "Join ENR WMS Portal✔", // Subject line
            text: `You are invited to join a new Board by admin. Join by url http://161.97.79.224:1945/sign-in/${boardId}`, // plain text body
            html: `<a>http://161.97.79.224:1945/sign-up/${boardId}</a>`,// html body
        });
    }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

//Update Board Rights
const acessRights = async(req, res)=>{
    const {email, boardId} = req.body
    const update = await User.findOneAndUpdate({email: email},
        {
            $addToSet:{boardId: [boardId]}
        }
    )
    if(update){
        sendMail(email).catch((err)=>{
            console.log(err)
        })
        return res.status(200).json({msg:"New user assigned to board"})
    }else{
        console.log("User Not found")
        sendMail(email, boardId).catch((err)=>{
            console.log(err)
            return res.status(400).json({msg: "Cant send Invitation"})
        })
        return res.status(200).json({msg:"Invitation has been send to user"})
    }
}
module.exports = {
    createBoard,
    getBoard,
    delBoard,
    acessRights
}