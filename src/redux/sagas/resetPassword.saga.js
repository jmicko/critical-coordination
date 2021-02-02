import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* resetPassword(action) {
   try {
      console.log('in reset password saga', action.payload);
      yield axios.put('/api/reset', action.payload)
   } catch (error) {
      console.log('Reset PW request failed', error);
   }
}

function* resetSaga() {
   yield takeLatest('RESET_PASSWORD', resetPassword);
}

export default resetSaga;

