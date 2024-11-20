import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import Api from "../../Api";
import {
  GET_MESSAGES_LIST_FAIL,
  GET_MESSAGES_LIST_REQUEST, GET_MESSAGES_LIST_SUCCESS, MESSAGE_OPEN_FAIL, MESSAGE_OPEN_REQUEST, MESSAGE_OPEN_SUCCESS,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS
} from "../actions/messages";

export default function* watcher() {

  yield takeLatest(SEND_MESSAGE_REQUEST, handleSendMessage)
  yield takeLatest(GET_MESSAGES_LIST_REQUEST, handleMessagesList)
  yield takeEvery(MESSAGE_OPEN_REQUEST, handleMessageOpen)
}


function* handleMessageOpen(action) {
  try {
    const { messageId } = action.payload;
    const { data } = yield call(Api.messageOpen, messageId)
    yield put({
      type: MESSAGE_OPEN_SUCCESS,
      payload: {
        data
      }
    });
  } catch (e) {
    yield put({
      type: MESSAGE_OPEN_FAIL,
      message: e.messages,
      payload: {
        data: e.response.data
      }
    })
  }
}

function* handleMessagesList(action) {
  try {
    const { friendId, params } = action.payload;
    const { data } = yield call(Api.messagesList, friendId, params)
    yield put({
      type: GET_MESSAGES_LIST_SUCCESS,
      payload: {
        data
      }
    });
  } catch (e) {
    yield put({
      type: GET_MESSAGES_LIST_FAIL,
      message: e.messages,
      payload: {
        data: e.response.data
      }
    })
  }
}

function* handleSendMessage(action) {
  try {
    const { formData } = action.payload;
    const { data } = yield call(Api.sendMessage, formData)
    yield put({
      type: SEND_MESSAGE_SUCCESS,
      payload: {
        data
      }
    });
  } catch (e) {
    yield put({
      type: SEND_MESSAGE_FAIL,
      message: e.messages,
      payload: {
        data: e.response.data
      }
    })
  }
}
