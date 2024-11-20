import { call, put, takeLatest } from 'redux-saga/effects'
import Api from "../../Api";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST, LOGIN_SUCCESS,
  REGISTRATION_FAIL,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS, USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS
} from "../actions/users";

export default function* watcher() {

  yield takeLatest(REGISTRATION_REQUEST, handleRegistration)
  yield takeLatest(LOGIN_REQUEST, handleLogin)
  yield takeLatest(USERS_LIST_REQUEST, handleGetUsersList)
}


function* handleGetUsersList(action) {
  try {
    const { params } = action.payload;
    const { data } = yield call(Api.usersList, params)
    yield put({
      type: USERS_LIST_SUCCESS,
      payload: {
        data
      }
    });
  } catch (e) {
    yield put({
      type: USERS_LIST_FAIL,
      message: e.messages,
      payload: {
        data: e.response.data
      }
    })
  }
}

function* handleLogin(action) {
  try {
    const { formData, rememberMe } = action.payload;
    const { data } = yield call(Api.login, formData)
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        data, rememberMe
      }
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: LOGIN_FAIL,
      message: e.messages,
      payload: {
        data: e.response.data
      }
    })

    if (action.payload.cb) {
      action.payload.cb(e.response.data, null);
    }
  }
}

function* handleRegistration(action) {
  try {
    const { formData, onUploadProgress } = action.payload;
    const { data } = yield call(Api.registration, formData, onUploadProgress)
    yield put({
      type: REGISTRATION_SUCCESS,
      payload: {
        data
      }
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    console.warn(e);
    yield put({
      type: REGISTRATION_FAIL,
      message: e.messages,
      payload: {
        data: e.response.data
      }
    })

    if (action.payload.cb) {
      action.payload.cb(e.response.data, null);
    }
  }
}
