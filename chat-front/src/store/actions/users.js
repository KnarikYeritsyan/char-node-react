export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL';

export function registrationRequest(formData, onUploadProgress, cb) {
  return {
    type: REGISTRATION_REQUEST,
    payload: {
      formData, onUploadProgress, cb
    }
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function loginRequest(formData, rememberMe, cb) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      formData, rememberMe, cb
    }
  }
}

export const USERS_LIST_REQUEST = 'USERS_LIST_REQUEST';
export const USERS_LIST_SUCCESS = 'USERS_LIST_SUCCESS';
export const USERS_LIST_FAIL = 'USERS_LIST_FAIL';

export function usersListRequest(params = {}) {
  return {
    type: USERS_LIST_REQUEST,
    payload: {
      params
    }
  }
}
