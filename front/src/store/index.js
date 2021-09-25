import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers";
import thunk from "redux-thunk";

// Below library is used to leverage user's local storage
import { persistStore, persistReducer } from "redux-persist";
//this is to get local storage
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist : ['lists', 'cards', 'boards'],
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
  let persistor = persistStore(store);
  return { store, persistor };
};
