import {CONSTANTS} from '../actions/actionConstants'

const initialState = {
    login: false,
    userId: null,
    email: null,
    boardId: [],
    token:''
}

const userReducer = (state = initialState, action)=>{
    switch (action.type){
        case CONSTANTS.ADD_USER : {
            const { login, userId, email, boardId,token} = action.payload
            return ({
                login: login,
                userId: userId,
                email: email,
                boardId: boardId,
                token:token
            })
        }
        case CONSTANTS.ADD_BOARDID:
            const boardId = action.payload
            const updateBoard = [...state['boardId'], boardId]
            return {...state, boardId: updateBoard}
        
        case CONSTANTS.UPDATE_BOARDlIST:
            const boardLists = action.payload
            return {...state, boardId: boardLists}
        
        default : {
            return state
        }
    }
}

export default userReducer;