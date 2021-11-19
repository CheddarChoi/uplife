import { combineReducers } from 'redux';
import counter from './counter';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/es/storage';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counter"]
};

const rootReducer =  combineReducers({
  counter,
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});
export default persistReducer(persistConfig, rootReducer);

