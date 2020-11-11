import { put, takeLatest, fork, select } from 'redux-saga/effects';
import { ActionType, Action } from 'types';

import { web3client } from 'lib';
import { selectAccount } from 'store/account/accountSelector';
import { poolApproveTokenSuccess, poolGetEarnedSuccess, poolGetStaked, poolGetEarned, poolGetStakedSuccess, poolGetStakeTokenBalanceSuccess, poolGetStakeTokenBalance, poolGetTotalStakedSuccess, poolGetPeriodFinishSuccess } from './poolActions';
import { selectPoolStakeTokenContract, selectPoolInfo, selectPoolContract, selectPoolStakeTokenInfo } from './poolSelector';

function* loadAllowance() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const stakeTokenContract = selectPoolStakeTokenContract(state);
    const poolInfo = selectPoolInfo(state);
    if (!account || !stakeTokenContract || !poolInfo) return;
    const allowance = yield web3client.allowance(stakeTokenContract, account.address, poolInfo.address);
    yield put(poolApproveTokenSuccess(allowance));
  } catch(err) {
    yield put(poolApproveTokenSuccess(0));
  }
}

function* approve() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const stakeTokenContract = selectPoolStakeTokenContract(state);
    const poolInfo = selectPoolInfo(state);
    if (!account || !stakeTokenContract || !poolInfo) return;
    yield web3client.approve(stakeTokenContract, poolInfo.address, account.address);
    const allowance = yield web3client.allowance(stakeTokenContract, account.address, poolInfo.address);
    yield put(poolApproveTokenSuccess(allowance));
  } catch(err) {
    yield put(poolApproveTokenSuccess(0));
  }
}

function* stake({ payload }: Action<number>) {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const poolContract = selectPoolContract(state);
    const stakingTokenInfo = selectPoolStakeTokenInfo(state);
    if (!account || !poolContract || !stakingTokenInfo) return;
    yield web3client.poolStake(poolContract, payload, stakingTokenInfo.decimals, account.address);
    yield put(poolGetStaked());
  } catch(err) {
    console.error(err);
  }
}

function* withdraw({ payload }: Action<number>) {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const poolContract = selectPoolContract(state);
    const stakingTokenInfo = selectPoolStakeTokenInfo(state);
    if (!account || !poolContract || !stakingTokenInfo) return;
    yield web3client.poolWithdraw(poolContract, payload, stakingTokenInfo.decimals, account.address);
    yield put(poolGetStaked());
  } catch(err) {
    
  }
}

function* harvest() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const poolContract = selectPoolContract(state);
    if (!account || !poolContract) return;
    yield web3client.poolHarvest(poolContract, account.address);
    yield put(poolGetEarned());
  } catch(err) {
    
  }
}

function* exit() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const poolContract = selectPoolContract(state);
    if (!account || !poolContract) return;
    yield web3client.poolExit(poolContract, account.address);
    yield put(poolGetStaked());
    yield put(poolGetEarned());
    yield put(poolGetStakeTokenBalance());
  } catch(err) {
    
  }
}

function* getEarned() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const poolContract = selectPoolContract(state);
    if (!account || !poolContract) return;

    const earned = yield web3client.poolGetEarned(poolContract, account.address);
    yield put(poolGetEarnedSuccess(earned));
  } catch(err) {
    
  }
}

function* getStaked() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const poolContract = selectPoolContract(state);
    if (!account || !poolContract) return;

    const staked = yield web3client.getBalance(poolContract, account.address);
    const totalStaked = yield web3client.getTotalSupply(poolContract);
    yield put(poolGetStakedSuccess(staked));
    yield put(poolGetTotalStakedSuccess(totalStaked));
    yield put(poolGetStakeTokenBalance());
  } catch(err) {
    
  }
}

function* getStakeTokenBalance() {
  try {
    const state = yield select();
    const account = selectAccount(state);
    const stakeTokenContract = selectPoolStakeTokenContract(state);
    if (!account || !stakeTokenContract) return;

    const balance = yield web3client.getBalance(stakeTokenContract, account.address);
    yield put(poolGetStakeTokenBalanceSuccess(balance));
  } catch(err) {
    console.error(err);
  }
}

function* getPeriodFinish() {
  try {
    const state = yield select();
    const poolContract = selectPoolContract(state);
    if (!poolContract) return;

    const period = yield web3client.poolGetPeriodFinish(poolContract);
    yield put(poolGetPeriodFinishSuccess(period));
  } catch(err) {
    yield put(poolGetPeriodFinishSuccess(new Date()));
  }
}

function* sagaWatcher() {
  //yield takeLatest(ActionType.INIT_STORE as any, getStakeTokenBalance);
  yield takeLatest(ActionType.POOL_LOAD_ALLOWANCE as any, loadAllowance);
  yield takeLatest(ActionType.POOL_APPROVE_TOKEN as any, approve);
  yield takeLatest(ActionType.POOL_STAKE as any, stake);
  yield takeLatest(ActionType.POOL_WITHDRAW as any, withdraw);
  yield takeLatest(ActionType.POOL_HARVEST as any, harvest);
  yield takeLatest(ActionType.POOL_EXIT as any, exit);
  yield takeLatest(ActionType.POOL_GET_EARNED as any, getEarned);
  yield takeLatest(ActionType.POOL_GET_STAKED as any, getStaked);
  yield takeLatest(ActionType.POOL_GET_STAKE_TOKEN_BALANCE as any, getStakeTokenBalance);
  yield takeLatest(ActionType.POOL_GET_PERIOD_FINISH as any, getPeriodFinish);
}

export default [
  fork(sagaWatcher),
];
