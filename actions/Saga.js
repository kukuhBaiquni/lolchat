import { all } from 'redux-saga/effects';
import { gabon } from './getProduct';

export default function* rootSaga() {
  yield all([
    gabon()
  ]);
};
