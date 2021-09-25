import { CONSTANTS } from "../actions/actionConstants";



// const myInitState = [
//   {
//     boardId : String,
//     title: String,
//     isOwener: Boolean
//   } 
// ]
const initialState = []
const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.INIT_BOARD:{
      const boards = action.payload;
      return boards
    }
    //Edited above
    // case CONSTANTS.ADD_LIST: {
    //   const { boardID, id } = action.payload;
    //   const board = state[boardID];
    //   const newListID = `list-${id}`;
    //   const newLists = [...board.lists, newListID];
    //   board.lists = newLists;
    //   return { ...state, [boardID]: board };
    // }

    case CONSTANTS.DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type,
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists;

        return { ...state, [boardID]: board };
      }
      return state;
    }
    // case CONSTANTS.DELETE_LIST: {
    //   const { listID, boardID } = action.payload;
    //   const board = state[boardID];
    //   const lists = board.lists;
    //   const newLists = lists.filter((id) => id !== listID);
    //   board.lists = newLists;
    //   return { ...state, [boardID]: board };
    // }

    case CONSTANTS.ADD_BOARD: {
      const { boardId, title, isOwener } = action.payload;
      const newBoard = {
        boardId: boardId,
        title: title,
        isOwener: isOwener
      };

      return [...state, newBoard];
    }
    case CONSTANTS.DELETE_BOARD: {
      const { boardId, index } = action.payload;
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};

export default boardsReducer;
