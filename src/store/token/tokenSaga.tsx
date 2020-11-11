import { put, takeLatest, fork, select } from 'redux-saga/effects';
import {
  ActionType,
} from 'types';

import { web3client } from 'lib';
import { setTotalSupply } from './tokenActions';
import { selectAccount } from 'store/account/accountSelector';

function* setTotalSupplySaga() {
  try {
    const totalSupply = yield web3client.getTotalSupply(web3client.tokenContract);
    yield put(setTotalSupply(totalSupply));
  } catch(err) {
    yield put(setTotalSupply(0));
  }
}

function* rebase() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;

    yield web3client.rebase(account.address);
  } catch(err) {
  }
}

function* tokenSagaWatcher() {
  yield takeLatest(ActionType.TOKEN_SET_TOTAL_SUPPLY as any, setTotalSupplySaga);
  yield takeLatest(ActionType.SET_ACCOUNT as any, setTotalSupplySaga);
  yield takeLatest(ActionType.TOKEN_REBASE as any, rebase);
}

export default [
  fork(tokenSagaWatcher),
];
