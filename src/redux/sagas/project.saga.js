import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getProject (action) {
    if( action.type === 'GET_PROJECT' ) { 
        try{
            const response = yield axios.get(`/api/project/${action.payload}`)
            yield put({ type: 'FETCH_PROJECT', payload: response.data})
        } catch( error ) {
            console.log('error with the GET request for the PROJECT', error);
        }
    }
}

function* updateProject (action) {
    if( action.type === 'UPDATE_PROJECT' ) {
        try{
            yield axios.put(`/api/project/update`, action.payload)
        } catch( error ) {
            console.log('error with the PROJECT UPDATE');
        }
    }
}

function* projectSaga() {
  yield takeLatest('GET_PROJECT', getProject);
  yield takeLatest('UPDATE_PROJECT', updateProject);
}

export default projectSaga;