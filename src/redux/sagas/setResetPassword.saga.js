import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* setResetPassword(action) {
   try {
      yield axios.put('/api/reset/forgot', action.payload)
   } catch (error) {
      console.log('Reset PW request failed', error);
   }
}

function* setResetPasswordSaga() {
   yield takeLatest('SET_RESET_PASSWORD', setResetPassword);
}

export default setResetPasswordSaga;

