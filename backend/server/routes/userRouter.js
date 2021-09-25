const express = require("express")
const {registerNewUser, loginUser, registerWithBoard,getBoardList}  = require("../Controllers/userController");
const router = express.Router()

router.get('/getBoardList/:boardId', getBoardList)
router.post('/newUser', registerNewUser)
router.post('/login', loginUser)
router.post('/newUser/:boardId', registerWithBoard)


module.exports = {
    routes:router
}

