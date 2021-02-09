import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPortfolio (action) {
    if( action.type === 'GET_PORTFOLIO' ) { 
        try{
            const response = yield axios.get(`/api/portfolio`)
            yield put({ type: 'FETCH_PORTFOLIO', payload: response.data})
        } catch( error ) {
            console.log('error with the GET request for the PORTFOLIO', error);
        }
    }
}

function* updatePortfoio (action) {
    if( action.type === 'UPDATE_PORTFOLIO' ) {
        try{
             yield axios.put(`/api/portfolio/update`, action.payload)
        } catch( error ) {
            console.log('error with the PORTFOLIO UPDATE');
        }
    }
}

function* portfolioSaga() {
  yield takeLatest('GET_PORTFOLIO', getPortfolio);
  yield takeLatest('UPDATE_PORTFOLIO', updatePortfoio);
}

export default portfolioSaga;
