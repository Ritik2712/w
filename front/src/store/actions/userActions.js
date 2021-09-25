import { CONSTANTS } from "./actionConstants"

export const addUser = (login, userId, email, boardId,token) =>{
    return{
        type:CONSTANTS.ADD_USER,
        payload: {login, userId, email, boardId,token}
    }
}

export const pushBoardId = (boardId)=>{
    return{
        type: CONSTANTS.ADD_BOARDID,
        payload: boardId
    }
}

export const addUpdatedBoard = (boards)=>{
    return{
        type: CONSTANTS.UPDATE_BOARDlIST,
        payload: boards
    }
}