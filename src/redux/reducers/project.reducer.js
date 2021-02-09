import { combineReducers } from 'redux';

const projectReducer = (state = {}, action) => {
   switch (action.type) {
      case 'SET_PROJECT':
         return action.payload;
      case 'CLEAR_PROJECT':
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
projectReducer,
projectTaskReducer,
});

