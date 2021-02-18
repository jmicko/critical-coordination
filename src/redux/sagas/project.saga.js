import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchProject(action) {
   try {
      const response = yield axios.get(`/api/project/${action.payload}`)
      yield put({ type: 'SET_PROJECT', payload: response.data })
   } catch (error) {
      console.log('error with the get request for the PROJECT', error);
   }

}

function* archiveProject(action) {
   try {
      const response = yield axios.put(`/api/project/${action.payload}`)
      // yield put({ type: 'SET_PROJECT', payload: response.data })
      yield put({ type: 'FETCH_PORTFOLIO'})

   } catch (error) {
      console.log('error with the get request for the PROJECT', error);
   }

}

function* unarchiveProject(action) {
   try {
      const response = yield axios.put(`/api/project/${action.payload}`)
      // yield put({ type: 'SET_PROJECT', payload: response.data })
      yield put({ type: 'FETCH_ARCHIVE'})

   } catch (error) {
      console.log('error with the get request for the PROJECT', error);
   }

}

function* projectSaga() {
   yield takeLatest('FETCH_PROJECT', fetchProject);
   yield takeLatest('ARCHIVE_PROJECT', archiveProject);
   yield takeLatest('UNARCHIVE_PROJECT', unarchiveProject);
}

export default projectSaga;
