import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTrackingData(action) {
   try {
      const carrier = action.payload.carrier;
      const tracking_number = action.payload.tracking_number;
      const response = yield axios.get(`/api/tracking/${carrier}/${tracking_number}`)
      yield put ({ type: 'SET_TRACKING_DATA', payload: response.data})
   } catch (error) {
      console.log('error with the get request from shippo', error);
   }

}

function* trackingSaga() {
   yield takeLatest('GET_TRACKING_DATA', getTrackingData);
}

export default trackingSaga;
