const trackingReducer = (state = {}, action) => {
   switch (action.type) {
      case 'SET_TRACKING_DATA':
         return action.payload;
      case 'CLEAR_TRACKING_DATA':
         return {};
      default:
         return state;
   }
};

export default trackingReducer;

