import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPortfolio (action) {
    if( action.type === 'GET_PORTFOLIO' ) {
        console.log(action.payload);
        
        try{
            const response = yield axios.get(`/api/portfolio/${action.payload}`)
            yield put({ type: 'FETCH_PORTFOLIO', payload: response.data})
        } catch( error ) {
            console.log('error with the get request for the PORTFOLIO', error);
        }
    }


}

function* portfolioSaga() {
  yield takeLatest('GET_PORTFOLIO', getPortfolio);
}

export default portfolioSaga;
