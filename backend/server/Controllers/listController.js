const { User } = require("../Models/userModel")
const { Board } = require("../Models/boardModel")
const { List } = require("../Models/listModel")
const ObjectId = require("mongodb").ObjectId

//Create a newList
const createList = async(req,res)=>{
    const {boardId, title, order } = req.body
    //checking if board exists
    Board.findById(boardId, function(err, board){
        if(err){
            return res.status(400).json({msg: 'Board Not found'})
        }else{
            const newList = new List({
                title:title,
                order:order,
                boardId: boardId
            })
            newList.save()
            .then((response)=>{
                // Board.findByIdAndUpdate(boardId, 
                //     {$addToSet: {list:[response._id]}}, 
                //     function(err, updateInfo){
                //         if(updateInfo){
                //             return res.status(400).json({listId:response._id, title:response.title})
                //         }
                //         else{
                //             res.status(400).json({msg:"Unable to store list in board"})
                //         }
                //     }
                // )
                if(response){
                    // return res.status(200).json({'title': response.title, 'order': response.order, 'listId':response._id})
                    return res.status(200).json(response)
                }
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json({msg:"Unable to create List"})
            })
        }
    })
}
//Deleating a list
const delList = async(req, res)=>{
    const _id = req.params.id
    const list = await List.findByIdAndDelete(_id)
    if(!list){
        return res.status(400).send()
    }else{
        const card = await List.deleteMany({listId: _id})
        return res.status(200).json({msg: "List deleted"})
    }
}

//Getting a list
const getList = (req, res)=>{
    const {boardId} = req.params
    console.log(boardId)
    List.find({'boardId': ObjectId(boardId)}, function(err, response){
        if(response){
            res.json(response)
        }else{
            res.json({msg:'No list found'})
        }
    })
}

//Updating List Info 
const updateList = async(req, res)=>{
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpates = ['title', 'order']
    const isValidUpdate = updates.every(
        (update)=> allowedUpates.includes(update)
    )
    if (!isValidUpdate){
        console.log('Not valid')
        return res.status(400).json({msg:"This update is not allowed"})
    }else{
        const list = await List.findByIdAndUpdate({_id: id}, req.body, {new:true})
        try{
            if(list){
                return res.status(200).json(list)
            }else{
                console.log("Hii")
                return res.status(400).json({msg:"Can't update list"})
            }
        }catch(err){
            console.log(err)
            res.status(400)
        }
    }
}
module.exports = {
    createList,
    getList,
    updateList,
    delList
}