import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* adminSaga() {
   yield takeLatest('ADMIN_FETCH_COMPANY', fetchCompanySaga)
   yield takeLatest('ADMIN_FETCH_LOCATION', fetchLocationSaga)
}

function* fetchCompanySaga() {
   try {
      const response = yield axios.get('/api/admin/company')
      yield put({ type: 'SET_ALLCOMPANY', payload: response.data})
   } catch (error) {
      console.log('Error in ADMIN GET COMPANY saga: ', error);
   }
 }

function* fetchLocationSaga() {
   try {
      const response = yield axios.get('/api/admin/location')
      yield put({ type: 'SET_ALLLOCATION', payload: response.data })
   } catch (error) {
      console.log('Error in ADMIN GET COMPANY saga: ', error);
   }
}


export default adminSaga;
