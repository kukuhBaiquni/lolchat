import { all } from 'redux-saga/effects';
import { watcherCheckPhoneNumber } from '../components/screens/login/Action';

export default function* rootSaga() {
  yield all([
    watcherCheckPhoneNumber()
  ]);
};
