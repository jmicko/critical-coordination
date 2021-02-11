import { combineReducers } from 'redux'; 
 
 const taskReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_TASK': 
        return action.payload;
      case 'CLEAR_TASK':
        return {};
      default:
        return state;
    }
  };
  
  const projectTaskReducer = (state = [], action) => {
    switch (action.type) {
       case 'SET_PROJECT_TASKS':
          return action.payload;
       case 'CLEAR_PROJECT_TASKS':
          return {};
       default:
          return state;
    }
  };

export default combineReducers({
  taskReducer,
  projectTaskReducer
});
  