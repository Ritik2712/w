const express = require("express")
const {createBoard, getBoard, delBoard, acessRights} = require("../Controllers/boardController")

const router = express.Router()

router.post('/newBoard', createBoard)
router.get('/getBoard/:boardId', getBoard)
router.delete('/:id', delBoard)
router.put('/acessRights', acessRights)
module.exports = {
    routes:router
} 