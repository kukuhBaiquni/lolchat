import { all } from 'redux-saga/effects';
import { watcherCheckPhoneNumber } from '../app/screens/login/Action';

export default function* rootSaga() {
    yield all([
        watcherCheckPhoneNumber()
    ]);
};
