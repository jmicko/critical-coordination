import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTask (action) {
    if( action.type === 'FETCH_TASK' ) { 
        try{
            const response = yield axios.get(`/api/task/${action.payload}`)
            yield put({ type: 'SET_TASK', payload: response.data})
        } catch( error ) {
            console.log('error with the get request for the TASK', error);
        }
    }
}

function* taskSaga() {
  yield takeLatest('FETCH_TASK', getTask);
}

export default taskSaga;
