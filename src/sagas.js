import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as passwordActions from 'actions/password';

const LOADING_DELAY = 1500;

function* startPasswordReset() {
  try {
    yield call(delay, LOADING_DELAY); // long server operation
    yield put(passwordActions.succeedPasswordReset());
  } catch (error) {
    yield put(passwordActions.failPasswordReset());
  }
}

export default function* rootSaga() {
  yield takeLatest(passwordActions.START_PASSWORD_RESET, startPasswordReset);
}
