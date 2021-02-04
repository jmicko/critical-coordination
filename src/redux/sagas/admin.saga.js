import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAllCompany() {
    console.log('In fetchAllCompany saga');
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.get('/api/admin/company');
        // put data into store via Reducer
        yield put({ type: 'SET_ALLCOMPANY', payload: response.data });
    } catch ( error ) {
        console.log('error with fetchAllCompany get request', error);
    }
} 

function* fetchAllLocation() {
    console.log('In fetchAllLocation saga');
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.get('/api/admin/location');
        // put data into store via Reducer
        yield put({ type: 'SET_ALLLOCATION', payload: response.data });
    } catch ( error ) {
        console.log('error with fetchAllLocation get request', error);
    }
} 


function* adminSaga() {
    yield takeLatest('FETCH_ALLCOMPANY', fetchAllCompany);
    yield takeLatest('FETCH_ALLLOCATION', fetchAllLocation);
}


export default adminSaga;
