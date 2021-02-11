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

function* fetchProjectTasks (action) {
    // console.log(action.payload);
    
    try {
        const response = yield axios.get(`/api/task/project/${action.payload}`)
        yield put( {type: 'SET_PROJECT_TASKS', payload: response.data})
    } catch(error) {
        console.log('error with the SET_PROJECT_TASKS request in the task.saga file', error);
    }
}

function* updateTask (action) {  
    console.log(action.payload);
      
    try {
        yield axios.put(`/api/task/update`, action.payload.updateRecord)
        yield put({ type: 'FETCH_PROJECT_TASKS', payload: action.payload.project_id })
    } catch( error ) {
        console.log('error with the UPDATE_TASK request in the task.saga file', error);
    }
}



function* taskSaga() {
  yield takeLatest('FETCH_TASK', getTask);
  yield takeLatest('FETCH_PROJECT_TASKS', fetchProjectTasks)
  yield takeLatest('UPDATE_TASK', updateTask)
}

export default taskSaga;
