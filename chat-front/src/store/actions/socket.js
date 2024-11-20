import socket from "socket.io-client";
import newMessageSound from '../../assets/audio/newMessage.mp3'
import Utils from "../../helpers/Utils";

const { REACT_APP_API_URL } = process.env;

export const SOCKET_NEW_MESSAGE = 'SOCKET_NEW_MESSAGE';
export const SOCKET_USER_ACTIVITY_CHANGE = 'SOCKET_USER_ACTIVITY_CHANGE';
export const SOCKET_FRIEND_TYPING = 'SOCKET_FRIEND_TYPING';
export const SOCKET_FRIEND_TYPING_END = 'SOCKET_FRIEND_TYPING_END';
export const SOCKET_MESSAGE_OPEN = 'SOCKET_MESSAGE_OPEN';

let io;
let typingTimout;
const sound = new Audio(newMessageSound);

export function socketInit(token) {
  return (dispatch) => {
    if (io) {
      return;
    }
    io = socket(REACT_APP_API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
    io.on('connect', () => {
      // io.emit('typing')
      console.log('connected');
    });
    io.on('userActivityChange', (user) => {
      dispatch({
        type: SOCKET_USER_ACTIVITY_CHANGE,
        payload: { user }
      });
    })
    io.on('newMessage', (data) => {
      try {
        sound.play();
      } catch (e) {
        console.log(e)
      }
      const friendId = Utils.getCurrentFriendId();
      if (friendId === +data.from) {
        dispatch({
          type: SOCKET_NEW_MESSAGE,
          payload: { data }
        });
      } else {
        //todo add toast
      }
    });
    io.on('messageOpen', (data) => {
      const friendId = Utils.getCurrentFriendId();
      if (friendId === +data.to) {
        dispatch({
          type: SOCKET_MESSAGE_OPEN,
          payload: { data }
        });
      }
    });
    io.on('friendTyping', (data) => {
      const { friendId } = data;
      if (Utils.getCurrentFriendId() === friendId) {
        dispatch({
          type: SOCKET_FRIEND_TYPING,
          payload: { data }
        });
        clearTimeout(typingTimout);
        typingTimout = setTimeout(() => {
          dispatch({
            type: SOCKET_FRIEND_TYPING_END,
            payload: { data }
          });
        }, 3000)
      }
    });
  }
}

const SOCKET_TYPING = 'SOCKET_TYPING';

export function socketTyping(friendId) {
  io.emit('typing', { friendId });
  return {
    type: SOCKET_TYPING,
    payload: {
      friendId
    }
  }
}
