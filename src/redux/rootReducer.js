import { combineReducers } from 'redux';
import userReducer from './slices/user';
import kanbanReducer from './slices/kanban';
import  queueReducer from './slices/queue';

const rootReducer = combineReducers({
  user: userReducer,
  kanban: kanbanReducer,
  queue: queueReducer

});

export default rootReducer;
