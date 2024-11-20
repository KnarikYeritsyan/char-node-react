import axios from "axios";
import toFormData from 'object-to-formdata';

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (e) => Promise.reject(e));

api.interceptors.response.use((r) => r, (e) => {
  if (e.response.status === 401) {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return Promise.reject(e);
});

class Api {
  static registration(data, onUploadProgress) {
    return api.post('/users/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });
  }

  static login(data) {
    return api.post('/users/login', data);
  }

  static usersList() {
    return api.get('/users/list');
  }

  static sendMessage(data) {
    return api.post('/messages/send', data);
  }

  static messagesList(friendId, params = {}) {
    return api.get(`/messages/list/${friendId}`, { params });
  }

  static messageOpen(messageId) {
    return api.put(`/messages/open`, { messageId });
  }
}

export default Api
