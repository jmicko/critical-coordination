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
  
  const projectTasksReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROJECT_TASKS':
        return action.payload;
    default:
      return state;
    }
  };

  // user will be on the redux state at:
  // state.user
export default combineReducers({
  taskReducer,
  projectTasksReducer
});
  