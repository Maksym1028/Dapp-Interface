import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface PoolReducerType {
  contract?: any;
  stakeTokenContract?: any;
  poolInfo?: any;
  stakeTokenInfo?: any;
  allowance: number;
  staked: number;
  totalStaked: number;
  stakeTokenBalance: number;
  earned: number;
  periodFinish: Date;
}

export const defaultState: PoolReducerType = {
  allowance: 0,
  staked: 0,
  totalStaked: 0,
  stakeTokenBalance: 0,
  earned: 0,
  periodFinish: new Date(),
};

// reducers
const poolSetPoolInfoReducer = (
  state: PoolReducerType,
  { payload }: Action<any>,
): PoolReducerType => ({
  ...state,
  poolInfo: payload,
});

const poolSetStakeTokenInfoReducer = (
  state: PoolReducerType,
  { payload }: Action<any>,
): PoolReducerType => ({
  ...state,
  stakeTokenInfo: payload,
});

const poolSetContractReducer = (
  state: PoolReducerType,
  { payload }: Action<any>,
): PoolReducerType => ({
  ...state,
  contract: payload,
});

const poolSetStakeTokenContractReducer = (
  state: PoolReducerType,
  { payload }: Action<any>,
): PoolReducerType => ({
  ...state,
  stakeTokenContract: payload,
});

const poolApproveTokenSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => ({
  ...state,
  allowance: payload,
});

const poolGetStakedSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => ({
  ...state,
  staked: payload,
});

const poolGetEarnedSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => ({
  ...state,
  earned: payload,
});

const poolGetStakeTokenBalanceReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => ({
  ...state,
  stakeTokenBalance: payload,
});

const poolGetTotalStakedSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<number>,
): PoolReducerType => ({
  ...state,
  totalStaked: payload,
});

const poolGetPeriodFinishSuccessReducer = (
  state: PoolReducerType,
  { payload }: Action<Date>,
): PoolReducerType => ({
  ...state,
  periodFinish: payload,
});

export const poolReducer = createReducer<PoolReducerType>(defaultState, {
  [ActionType.POOL_SET_POOL_INFO]: poolSetPoolInfoReducer,
  [ActionType.POOL_SET_STAKE_TOKEN_INFO]: poolSetStakeTokenInfoReducer,
  [ActionType.POOL_SET_CONTRACT]: poolSetContractReducer,
  [ActionType.POOL_SET_STAKE_TOKEN_CONTRACT]: poolSetStakeTokenContractReducer,
  [ActionType.POOL_APPROVE_TOKEN_SUCCESS]: poolApproveTokenSuccessReducer,
  [ActionType.POOL_GET_STAKED_SUCCESS]: poolGetStakedSuccessReducer,
  [ActionType.POOL_GET_EARNED_SUCCESS]: poolGetEarnedSuccessReducer,
  [ActionType.POOL_GET_STAKE_TOKEN_BALANCE_SUCCESS]: poolGetStakeTokenBalanceReducer,
  [ActionType.POOL_GET_TOTAL_STAKED_SUCCESS]: poolGetTotalStakedSuccessReducer,
  [ActionType.POOL_GET_PERIOD_FINISH_SUCCESS]: poolGetPeriodFinishSuccessReducer,
});
