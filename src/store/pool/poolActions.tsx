import { ActionType } from 'types';

export const poolSetPoolInfo = (payload: any) => ({
  type: ActionType.POOL_SET_POOL_INFO,
  payload,
});

export const poolSetStakeTokenInfo = (payload: any) => ({
  type: ActionType.POOL_SET_STAKE_TOKEN_INFO,
  payload,
});

export const poolSetContract = (payload: any) => ({
  type: ActionType.POOL_SET_CONTRACT,
  payload,
});

export const poolSetStakeTokenContract = (payload: any) => ({
  type: ActionType.POOL_SET_STAKE_TOKEN_CONTRACT,
  payload,
});

export const poolApproveToken = () => ({
  type: ActionType.POOL_APPROVE_TOKEN,
});

export const poolLoadAllowance = () => ({
  type: ActionType.POOL_LOAD_ALLOWANCE,
});

export const poolApproveTokenSuccess = (payload: number) => ({
  type: ActionType.POOL_APPROVE_TOKEN_SUCCESS,
  payload,
});

export const poolStake = (payload: number) => ({
  type: ActionType.POOL_STAKE,
  payload,
});

export const poolWithdraw = (payload: number) => ({
  type: ActionType.POOL_WITHDRAW,
  payload,
});

export const poolHarvest = () => ({
  type: ActionType.POOL_HARVEST,
});

export const poolExit = () => ({
  type: ActionType.POOL_EXIT,
});

export const poolGetEarned = () => ({
  type: ActionType.POOL_GET_EARNED,
});

export const poolGetEarnedSuccess = (payload: number) => ({
  type: ActionType.POOL_GET_EARNED_SUCCESS,
  payload,
});

export const poolGetStaked = () => ({
  type: ActionType.POOL_GET_STAKED,
});

export const poolGetStakedSuccess = (payload: number) => ({
  type: ActionType.POOL_GET_STAKED_SUCCESS,
  payload,
});

export const poolGetStakeTokenBalance = () => ({
  type: ActionType.POOL_GET_STAKE_TOKEN_BALANCE,
});

export const poolGetStakeTokenBalanceSuccess = (payload: number) => ({
  type: ActionType.POOL_GET_STAKE_TOKEN_BALANCE_SUCCESS,
  payload,
});

export const poolGetTotalStakedSuccess = (payload: number) => ({
  type: ActionType.POOL_GET_TOTAL_STAKED_SUCCESS,
  payload,
});

export const poolGetPeriodFinish = () => ({
  type: ActionType.POOL_GET_PERIOD_FINISH,
});

export const poolGetPeriodFinishSuccess = (payload: Date) => ({
  type: ActionType.POOL_GET_PERIOD_FINISH_SUCCESS,
  payload,
});
