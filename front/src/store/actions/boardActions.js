import { CONSTANTS } from "./actionConstants";
import { v4 as uuid } from "uuid";
import axios from "axios";

const id = uuid();
export const initBoard = boards =>{
  return {
    type: CONSTANTS.INIT_BOARD,
    payload: boards
  }
}

export const addBoard = ({boardId, title, isOwener}) => {
  
  return {
    type: CONSTANTS.ADD_BOARD,
    payload: { boardId, title, isOwener }
  };
}

export const deleteBoard = (boardId, index)=>(dispatch) => {
  axios.delete(`/api/${boardId}`)
  .then((res)=>{
    dispatch({
      type: CONSTANTS.DELETE_BOARD,
      payload: { boardId, index }
    })
  })
  .catch((err)=>{
    console.log(err)
  })
  
};
//changes above
export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};



