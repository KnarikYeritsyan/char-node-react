import {
  SOCKET_FRIEND_TYPING,
  SOCKET_FRIEND_TYPING_END,
  SOCKET_MESSAGE_OPEN,
  SOCKET_NEW_MESSAGE
} from "../actions/socket";
import {
  GET_MESSAGES_LIST_FAIL,
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS, MESSAGE_OPEN_REQUEST,
  SEND_MESSAGE_SUCCESS
} from "../actions/messages";
import Utils from "../../helpers/Utils";

const initialState = {
  messagesList: [],
  messagesListRequestStatus: '',
  friendTyping: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SOCKET_NEW_MESSAGE: {
      const { data } = action.payload;

      return {
        ...state,
        messagesList: [data, ...state.messagesList]
      }
    }
    case SEND_MESSAGE_SUCCESS: {
      const { message } = action.payload.data;
      return {
        ...state,
        messagesList: [message, ...state.messagesList]
      }
    }
    case GET_MESSAGES_LIST_REQUEST: {
      return {
        ...state,
        messagesListRequestStatus: 'request',
        messagesList: [],
      }
    }
    case GET_MESSAGES_LIST_FAIL: {
      return {
        ...state,
        messagesListRequestStatus: 'fail',
      }
    }
    case GET_MESSAGES_LIST_SUCCESS: {
      const { messages } = action.payload.data;
      return {
        ...state,
        messagesList: messages,
        messagesListRequestStatus: 'success',
      }
    }
    case SOCKET_FRIEND_TYPING: {
      return {
        ...state,
        friendTyping: true,
      }
    }
    case SOCKET_FRIEND_TYPING_END: {
      return {
        ...state,
        friendTyping: false,
      }
    }
    case MESSAGE_OPEN_REQUEST: {
      const { messageId } = action.payload;
      const messagesList = state.messagesList.map(m => {
        if (m.id === messageId) {
          m.seen = new Date()
        }
        return m;
      })
      return {
        ...state,
        friendTyping: false,
        messagesList,
      }
    }
    case SOCKET_MESSAGE_OPEN: {
      const { id } = action.payload.data;
      const messagesList = state.messagesList.map(m => {
        if (m.id === id) {
          m.seen = new Date()
        }
        return m;
      })
      return {
        ...state,
        friendTyping: false,
        messagesList,
      }
    }
    default: {
      return state
    }
  }
}


