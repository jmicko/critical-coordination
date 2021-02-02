 const portfolioReducer = (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_PORTFOLIO': //think about this call name and work out a better one
        return action.payload;
      case 'CLEAR_PORTFOLIO':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default portfolioReducer;
  