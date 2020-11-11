import { put, takeLatest, fork, select, call } from 'redux-saga/effects';
import {
  ActionType, Action,
} from 'types';

import { web3client } from 'lib';
import Config from 'config';
import { setStakeTokenAllowance, setTotalStaked, setStaked, setTotalLocked, setTotalUnlocked, loadStaked, loadLocked } from './stakeActions';
import { selectAccount } from 'store/account/accountSelector';
import { selectStaked } from './stakeSelector';

function* setAllowanceSaga() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    const allowance = yield web3client.allowance(web3client.memeTokenContract, account.address, Config.Pool.address);
    yield put(setStakeTokenAllowance(allowance));
  } catch(err) {
    yield put(setStakeTokenAllowance(0));
  }
}

function* setStakedSaga() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    const result = yield web3client.totalStakedFor(account.address);
    yield put(setStaked(result));
  } catch(err) {
    yield put(setStaked(0));
  }
}

function* setTotalStakedSaga() {
  try {
    const result = yield web3client.totalStaked();
    yield put(setTotalStaked(result));
  } catch(err) {
    yield put(setTotalStaked(0));
  }
}

function* setTotalLockedSaga() {
  try {
    const result = yield web3client.totalLocked();
    yield put(setTotalLocked(result));
  } catch(err) {
    yield put(setTotalLocked(0));
  }
}

function* setTotalUnlockedSaga() {
  try {
    const result = yield web3client.totalUnlocked();
    yield put(setTotalUnlocked(result));
  } catch(err) {
    yield put(setTotalUnlocked(0));
  }
}

function* approve() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.approve(web3client.memeTokenContract, Config.Pool.address, account.address);
    yield call(setAllowanceSaga);
  } catch(err) {
  }
}

function* stake({ payload }: Action<number>) {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    yield web3client.stake(payload * Math.pow(10, Config.MemeToken.decimals), account.address);
    yield put(loadStaked());
    yield put(loadLocked());
  } catch(err) {
    console.error(err);
  }
}

function* unstake({ payload }: Action<number>) {
  try {
    const state = yield select();
    const account = selectAccount(state);
    if (!account) return;
    const staked = selectStaked(state);
    yield web3client.unstake(staked, account.address);
    yield put(loadStaked());
    yield put(loadLocked());
  } catch(err) {
    console.error(err);
  }
}

function* stakeSagaWatcher() {
  yield takeLatest(ActionType.GEYSER_LOAD_ALLOWANCE as any, setAllowanceSaga);
  yield takeLatest(ActionType.GEYSER_LOAD_STAKED as any, setStakedSaga);
  yield takeLatest(ActionType.GEYSER_LOAD_STAKED as any, setTotalStakedSaga);
  yield takeLatest(ActionType.GEYSER_LOAD_LOCKED as any, setTotalLockedSaga);
  yield takeLatest(ActionType.GEYSER_LOAD_LOCKED as any, setTotalUnlockedSaga);
  yield takeLatest(ActionType.GEYSER_APPROVE_TOKEN as any, approve);
  yield takeLatest(ActionType.GEYSER_GEYSER_TOKEN as any, stake);
  yield takeLatest(ActionType.GEYSER_UNGEYSER_TOKEN as any, unstake);
}

export default [
  fork(stakeSagaWatcher),
];
