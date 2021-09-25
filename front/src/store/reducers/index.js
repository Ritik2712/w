import { combineReducers } from "redux";
import {persistReducer} from "redux-persist"
import userReducer from "./userReducer";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import boardsReducer from "./boardsReducer";
import boardOrderReducer from "./boardOrderReducer";
import activeBoardReducer from "./activeBoardReducer";
import storage from "redux-persist/lib/storage";

const userConfig = {
  key:"auth",
  storage: storage,
  blacklist:['boardId']
}
export default combineReducers({
  user: persistReducer(userConfig,userReducer),
  lists: listsReducer,
  cards: cardsReducer,
  boards: boardsReducer,
  boardOrder: boardOrderReducer,
  activeBoard: activeBoardReducer
});
