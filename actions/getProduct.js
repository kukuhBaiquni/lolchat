import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
const SERVER_URL = 'http://halalbeef.co.id/'

export const getAllProducts = () => {
  return { type: 'GET_ALL_PRODUCTS' };
};

export function* gabon() {
  yield takeEvery('GET_ALL_PRODUCTS', workerGetAllProducts);
};

function* workerGetAllProducts() {
  console.log('asu');
  try {
    var response = yield call(() => {
      return request
      .get('http://192.168.42.200/gabon')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw.data;
  }catch (error) {
  }
};
