export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';

export function sendMessage(formData = {}) {
  return {
    type: SEND_MESSAGE_REQUEST,
    payload: {
      formData,
    }
  }
}

export const GET_MESSAGES_LIST_REQUEST = 'GET_MESSAGES_LIST_REQUEST';
export const GET_MESSAGES_LIST_SUCCESS = 'GET_MESSAGES_LIST_SUCCESS';
export const GET_MESSAGES_LIST_FAIL = 'GET_MESSAGES_LIST_FAIL';

export function getMessagesList(friendId, params = {}) {
  return {
    type: GET_MESSAGES_LIST_REQUEST,
    payload: {
      friendId, params,
    }
  }
}

export const MESSAGE_OPEN_REQUEST = 'MESSAGE_OPEN_REQUEST';
export const MESSAGE_OPEN_SUCCESS = 'MESSAGE_OPEN_SUCCESS';
export const MESSAGE_OPEN_FAIL = 'MESSAGE_OPEN_FAIL';

export function messageOpenRequest(messageId) {
  return {
    type: MESSAGE_OPEN_REQUEST,
    payload: {
      messageId,
    }
  }
}
