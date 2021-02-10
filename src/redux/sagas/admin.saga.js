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

function* fetchAllUsers() {
    console.log('In fetchAllUsers saga');
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.get('/api/admin/users');
        // put data into store via Reducer
        yield put({ type: 'SET_ALLUSERS', payload: response.data });
    } catch ( error ) {
        console.log('error with fetchAllUsers get request', error);
    }
} 

function* fetchTaskStatus() {
    console.log('In fetchTaskStatus saga');
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.get('/api/admin/taskstatus');
        // put data into store via Reducer
        yield put({ type: 'SET_TASKSTATUS', payload: response.data });
    } catch ( error ) {
        console.log('error with fetchTaskStatus get request', error);
    }
} 

function* updateTaskStatus(action) {
    console.log('In updateTaskStatus saga', action.payload);
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.put('/api/admin/taskstatus', action.payload);
    } catch ( error ) {
        console.log('error with updateTaskStatus get request', error);
    }
} 

function* updateUserViaAdmin(action) {
    console.log('In updateUserViaAdmin saga', action.payload);
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.put('/api/admin/usermodify', action.payload);
        yield put({ type: 'FETCH_ALLUSERS' });
        yield put({ type: 'FETCH_ALLCOMPANY' });
    } catch ( error ) {
        console.log('error with updateUserViaAdmin get request', error);
    }
} 

function* updateCompanyViaAdmin(action) {
    console.log('In updateCompanyViaAdmin saga', action.payload);
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.put('/api/admin/companymodify', action.payload);
        yield put({ type: 'FETCH_ALLCOMPANY' });
    } catch ( error ) {
        console.log('error with updateCompanyViaAdmin get request', error);
    }
} 


function* adminAddUser(action) {
   try {
      yield axios.post('/api/admin/adduser', action.payload)
      yield put({ type: 'FETCH_ALLUSERS' })
   }catch (error) {
      console.log('error in Admin Add User Saga, ', error);
      }
   
}
function* adminAddCompany(action) {
   try {
      yield axios.post('/api/admin/addcompany', action.payload)
      yield put({ type: 'FETCH_ALLCOMPANY' })
   } catch (error) {
      console.log('error in Admin Add Company Saga, ', error);
   }
}

function* adminAddLocation(action) {
   try {
      yield axios.post('/api/admin/addlocation', action.payload)
      yield put({ type: 'FETCH_ALLLOCATION' })
   } catch (error) {
      console.log('error in Admin Add Location Saga, ', error);
   }
}

function* adminAddStatus(action) {
   try {
      yield axios.post('/api/admin/addstatus', action.payload)
      yield put({ type: 'FETCH_TASKSTATUS' })
   } catch (error) {
      console.log('error in Admin Add Status Saga, ', error);
   }
}

function* adminAddProject(action) {
    try {
        const response = yield axios.post('/api/admin/addproject', action.payload)
        document.cookie = `project=${response.data.id}`;
        yield put ({ type: 'FETCH_PORTFOLIO' })
    } catch (error) {
        console.log('error in Admin Add Project Saga, ', error);
    }
}

function* adminAddTask(action) {
    console.log('in AdminAddTaskSaga');
    try {
        yield axios.post('/api/admin/addtask', action.payload)
        yield put({ type: 'FETCH_PROJECT_TASKS', payload: action.payload.project })
    } catch (error) {
        console.log('error in Admin Add Project Saga, ', error);
    }
}

function* adminSaga() {
    yield takeLatest('FETCH_ALLCOMPANY', fetchAllCompany);
    yield takeLatest('FETCH_ALLLOCATION', fetchAllLocation);
    yield takeLatest('FETCH_ALLUSERS', fetchAllUsers);
    yield takeLatest('FETCH_TASKSTATUS', fetchTaskStatus);
    yield takeLatest('UPDATE_TASKSTATUS', updateTaskStatus);
    yield takeLatest('ADMIN_ADD_USER', adminAddUser)
    yield takeLatest('ADMIN_ADD_COMPANY', adminAddCompany);
    yield takeLatest('ADMIN_ADD_LOCATION', adminAddLocation);
    yield takeLatest('ADMIN_ADD_STATUS', adminAddStatus);
    yield takeLatest('ADMIN_ADD_PROJECT', adminAddProject);
    yield takeLatest('UPDATE_USER_VIAADMIN', updateUserViaAdmin);
    yield takeLatest('ADMIN_ADD_TASK', adminAddTask)
    yield takeLatest('UPDATE_COMPANY_VIAADMIN', updateCompanyViaAdmin);
    
}

export default adminSaga;
