const projectReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_PROJECT': 
        return action.payload;
      case 'CLEAR_PROJECT':
        return {};
      default:
        return state;
    }
  };
  
  export default projectReducer;