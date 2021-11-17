import { combineReducers } from 'redux';
import counter from './counter';

export default combineReducers({
  counter,
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});