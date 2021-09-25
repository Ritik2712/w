import { CONSTANTS } from "../actions/actionConstants";
import _ from "lodash"

// const myInitState = [
//   {
//     _id:String,
//     title:String,
//     order:String,
//     boardId:String,
//   }
// ]
const initialState = []

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.INIT_LIST: {
      const lists = action.payload;
      return [...lists]
    }
    
    case CONSTANTS.ADD_LIST: {
      return [...state, action.payload];
    }

    case CONSTANTS.UPDATE_LIST: {
      const {list, soIndex} = action.payload
      const listCopy = [...state]
  
      const chgList = listCopy[soIndex]
      chgList.order = list.order
      const finalOrder = _.orderBy(listCopy, ['order'], ['asc'])      
      // console.log(listCopy)
      // console.log(finalOrder)
      
      return [...finalOrder]
    }

    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listId, newTitle, index } = action.payload;

      const list = [...state]
      list[index].title = newTitle 
      return [...list] ;
    }

    case CONSTANTS.DELETE_LIST: {
      const { index } = action.payload;
      const cpyList = [...state]
      cpyList.splice(index, 1)
     
      return [...cpyList];
    }

    //New  Updates above

    


    default:
      return state;
  }
};

export default listsReducer;
