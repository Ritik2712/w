const express = require("express")
const { createList, getList, updateList, delList } = require("../Controllers/listController")
const router = express.Router()

router.post('/newList', createList)
router.get('/getList/:boardId', getList)
router.patch('/updateList/:id', updateList)
router.delete('/delList/:id', delList)

module.exports = {
    routes:router
}