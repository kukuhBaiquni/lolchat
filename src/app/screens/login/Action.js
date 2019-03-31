import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { url } from '../../../config/ServerUrl';

export const checkPhoneNumber = (data) => {
    return { type: 'CHECK_PHONE_NUMBER', data };
};

const checkPhoneNumberSuccess = (data) => {
    return { type: 'CHECK_PHONE_NUMBER_SUCCESS', data };
};

const checkPhoneNumberFailed = (data) => {
    return { type: 'CHECK_PHONE_NUMBER_FAILED', data };
};

export const resetAll = () => {
    return { type: 'RESET_ALL' };
};

export function* watcherCheckPhoneNumber(data) {
    yield takeEvery('CHECK_PHONE_NUMBER', workerCheckPhoneNumber);
};

function* workerCheckPhoneNumber(form) {
    try {
        const response = yield call(() => {
            return request
            .post(`${url}api/mobile/v1/login/checkphone`)
            .send({phoneNumber: form.data})
            .then((res) => {
                return res;
            })
        })
        if (response.body.success) {
            yield put(checkPhoneNumberSuccess(response.body.data))
        }else{
            yield put(checkPhoneNumberFailed(response.body.data))
        }
    }catch (error) {
        yield put(checkPhoneNumberFailed(null));
    }
}
