import { combineReducers } from 'redux';


const allCompanyReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALLCOMPANY':
      return action.payload;
    default:
      return state;
  }
};
 
const allLocationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALLLOCATION':
      return action.payload;
    default:
      return state;
  }
};

const taskStatusReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TASKSTATUS':
      return action.payload;
    default:
      return state;
  }
};

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALLUSERS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({
  allCompanyReducer,
  allLocationReducer,
  allUsersReducer,
  taskStatusReducer,
 });