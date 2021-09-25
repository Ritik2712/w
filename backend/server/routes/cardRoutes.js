const express = require("express")
const {createCard, getCard, updateCard, delCard} = require("../Controllers/cardController")
const router = express.Router()

router.post("/newCard", createCard)
router.get("/getCard/:boardId", getCard)
router.patch('/updateCard/:cardId', updateCard)
router.delete('/delCard/:id', delCard)

module.exports = {
    routes:router
}