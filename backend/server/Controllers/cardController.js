const { List } = require("../Models/listModel")
const {Card} = require("../Models/cardModel")
const ObjectId = require("mongodb").ObjectId
//Create new card 
const createCard = (req, res)=>{
    const {boardId, listId, title, order} = req.body
    const newCard = new Card({
        title:title,
        order:order,
        boardId: boardId,
        listId:listId,

    })
    newCard.save()
    .then((response)=>{
        if(response){
            //return cardId 
            return res.status(200).json(response)
        }
    })
    .catch((err)=>{
        console.log(err)
        return res.status(400)
    })
}
//Deleate cad by id
const delCard = async(req, res)=>{
    const id = req.params.id
    const card = await Card.findByIdAndDelete(id)
    if(card){
        return res.status(200).send()
    }else{
        return res.status(400).json({msg:"Card not found"})
    }
}
//Get card by Id
const getCard = (req, res)=>{
    const {boardId} = req.params
    if(boardId){
        Card.find({'boardId':ObjectId(boardId) }, function(err, response){
            if(response){
                res.json(response)
            }else{
                res.json({msg:"No card Found"})
            }
        })
    }else{
        console.log(boardId)
    }
    
}
//Update Details of card : There are type to it
const updateCard = async(req, res)=>{
    const cardId = req.params.cardId
    const updates = Object.keys(req.body)
    const allowedUpates = ['title', 'order', 'listId']
    const isValidUpdate = updates.every(
        (update)=> allowedUpates.includes(update)
    )
    if (!isValidUpdate){
        return res.status(400).json({msg:"This update is not allowed"})
    }else{
        const card = await Card.findByIdAndUpdate({_id: cardId}, req.body, {new:true})
        try{
            if(card){
                return res.status(200).json(card)
            }else{
                return res.status(400).json({msg:"Can't update list"})
            }
        }catch(err){
            console.log(err)
            res.status(400)
        }
    }
}

module.exports = {
    createCard,
    getCard,
    updateCard,
    delCard
}