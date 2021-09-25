import { CONSTANTS } from "./actionConstants";
import {v4 as uuid} from 'uuid'
import axios from "axios";


export const initCard = (cardList) =>{
  return {
    type: CONSTANTS.INIT_CARD,
    payload: cardList
  }
}
export const addCard = (listId, card) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { listId, card}
  };
};

export const updateCardById = (destination, currCard, cardId, params)=>(dispatch)=>{
  console.log(destination.droppableId)
    axios.patch(`/api/updateCard/${cardId}`, {...params, 'listId': destination.droppableId})
    .then((res)=>{
      dispatch({
        type:CONSTANTS.UPDATE_CARD,
        payload:{
          currCard: currCard,
          card: res.data
        }
      })
    })
    .catch((err)=>{
      console.log(err)

    })
  }


export const editCard = (id, listId, index, newText) => (dispatch)=>{
  axios.patch(`/api/updateCard/${id}`, {'title': newText})
  .then((res)=>{
    dispatch({
      type: CONSTANTS.EDIT_CARD,
      payload: { id, listId, index, newText }    
    })
  })
  .catch((err)=>{
    console.log(err)
  })
};

export const deleteCard = (id, listId, index) =>(dispatch)=> {
  axios.delete(`/api/delCard/${id}`)
  .then((res)=>{
    dispatch({
      type: CONSTANTS.DELETE_CARD,
      payload: { id, listId, index }
    })
  })
  .catch((err)=>{
    console.log(err)
  })
};
