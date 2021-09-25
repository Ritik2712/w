import { CONSTANTS } from "../actions/actionConstants";
import _ from "lodash"
const initialState = {
  // "card-0": {
  //   text: "Last Episode",
  //   id: `card-0`,
  //   list: "list-0"
  // }
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.INIT_CARD :{
      const cardList =  action.payload;
      return {...cardList}
    }

    case CONSTANTS.ADD_CARD: {
      const { listId, card } = action.payload;
      const newCard = listId in state ? [...state[listId], card] : [card]
      
      const newState = {
        ...state
      }
      newState[listId] = newCard
      // console.log(newState)
      return {...newState};
    }

    case CONSTANTS.UPDATE_CARD: {
      const {currCard, card} = action.payload
      
      // console.log(state)
      // var copyCards = {...state}
      // if (destination.droppableId === source.droppableId){
      //   copyCards[destination.droppableId].splice(source.index, 1 )
      //   copyCards[destination.droppableId].splice(destination.index, 0, card)
      // }else{
      //   //remove an item from specific postion
      //   //add item to new position
      //   console.log(copyCards[source.droppableId])
      //   // console.log(copyCards[destination.droppableId])

      //   console.log(copyCards[source.droppableId].splice(source.index, 1))
      //   console.log(card)
      //   copyCards[destination.droppableId].splice(destination.index, 0, card)

      // }
      //TODO: Hear error can occure
      // console.log(newCards)
      // console.log(copyCards[source.droppableId])
      // console.log(copyCards[destination.droppableId])
      return {...currCard}
    }
    //NEW CHG ABOVE

    case CONSTANTS.EDIT_CARD: {
      const { id,listId, index, newText } = action.payload;
      const card = {...state}
      card[listId][index].title = newText;
      return {...card};
    }

    case CONSTANTS.DELETE_CARD: {
      const { id, listId, index } = action.payload;
      const newState = {...state};
      newState[listId].splice(index, 1)
      // console.log(newState === state[listId])
      return {...newState};
    }

    default:
      return state;
  }
};

export default cardsReducer;
