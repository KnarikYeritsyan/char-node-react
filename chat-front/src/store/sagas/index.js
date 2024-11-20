import { all, fork } from 'redux-saga/effects'
import users from './users'
import messages from './messages'

export default function* watchers() {
  yield all([
    users,
    messages,
  ].map(fork));
}
