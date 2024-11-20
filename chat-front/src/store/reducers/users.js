import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTRATION_FAIL,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS, USERS_LIST_FAIL, USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS
} from "../actions/users";
import Account from "../../helpers/Account";
import { SOCKET_USER_ACTIVITY_CHANGE } from "../actions/socket";
import {toast} from "react-toastify";

const initialState = {
  token: Account.getToken(),
  profile: {},
  registrationRequestStatus: [],
  registrationErrors: {},
  usersList: [],
  usersListRequestStatus: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequestStatus: 'request'
      }
    }
    case REGISTRATION_FAIL: {
      console.log(action.payload);
      return {
        ...state,
        registrationRequestStatus: 'fail'
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequestStatus: 'ok'
      }
    }
    case LOGIN_SUCCESS: {
      const { token, user } = action.payload.data;
      const { rememberMe } = action.payload;
      Account.setToken(token, rememberMe)
      return {
        ...state,
        token,
        profile: user
      }
    }

    case LOGIN_FAIL: {
      const data = action.payload.data
      toast.error(`${data.message}`, {
        position: "top-right",
        autoClose: 3000,
      })
      console.log(data)
      return {
        ...state,
      }
    }
    case USERS_LIST_REQUEST: {
      return {
        ...state,
        usersListRequestStatus: 'request'
      }
    }
    case USERS_LIST_FAIL: {
      return {
        ...state,
        usersListRequestStatus: 'fail'
      }
    }
    case USERS_LIST_SUCCESS: {
      const { users } = action.payload.data;
      return {
        ...state,
        usersList: users,
        usersListRequestStatus: 'ok'
      }
    }
    case SOCKET_USER_ACTIVITY_CHANGE: {
      const { user } = action.payload;

      const usersList = state.usersList.map(u => {
        if (u.id === user.id) {
          u.isOnline = user.isOnline;
          u.lastLogin = user.lastLogin;
        }
        return u;
      });
      return {
        ...state,
        usersList: [...usersList]
      }
    }
    default: {
      return state
    }
  }
}
