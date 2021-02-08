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

// user will be on the redux state at:
// state.user
export default projectReducer;
