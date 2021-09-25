import axios from "axios";
import { CONSTANTS } from "./actionConstants";


export const initList = lists =>{
  return {
    type: CONSTANTS.INIT_LIST,
    payload: lists
  }
}
export const addList = list => {
  return {
    type:CONSTANTS.ADD_LIST,
    payload:list
  }
};

export const updateListById = (chg, params) =>(dispatch)=>{
  const {id, soIndex, desIndex} = chg
  axios.patch(`/api/updateList/${id}`, params)
  .then((res)=>{
    if(!res.data.msg){
      dispatch({type:CONSTANTS.UPDATE_LIST, payload:{list:res.data, soIndex, desIndex}})
    }
  })
  .catch((err)=>{
    console.log(err)
    //call a dispatch to return state again
  })
}

//NEW CHANGES ABOVE
export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID
      }
    });
  };
};

export const editTitle = (listId, newTitle, index)=>(dispatch) => {
  console.log(listId)
  console.log(newTitle)
  axios.patch(`/api/updateList/${listId}`, {'title': newTitle})
  .then((res)=>{
    if (!res.data.msg){
      dispatch({
        type: CONSTANTS.EDIT_LIST_TITLE,
        payload: {
          listId,
          newTitle,
          index
        }
      })
    }
  })
  .catch((err)=>{
    console.log(err)
  })
};

export const deleteList = (listId, index) => (dispatch)=>{

  axios.delete(`/api/delList/${listId}`)
  .then((res)=>{
    console.log(res.data)
    if(res.data.msg){
      console.log("Hii")
      dispatch({
        type:CONSTANTS.DELETE_LIST,
        payload:{index}
      })
    }
  })
  .catch((err)=>{
    console.log(err)
  })
};
