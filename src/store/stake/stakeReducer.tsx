import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface StakeReducerType {
  allowance: number;
  staked: number;
  totalStaked: number;
  totalLocked: number;
  totalUnlocked: number;
}

export const defaultState: StakeReducerType = {
  allowance: 0,
  staked: 0,
  totalStaked: 0,
  totalLocked: 0,
  totalUnlocked: 0,
};

// reducers
const setStakeTokenAllownaceReducer = (
  state: StakeReducerType,
  { payload }: Action<number>,
): StakeReducerType => {
  return {
    ...state,
    allowance: payload,
  };
}

const setTotalStakedReducer = (
  state: StakeReducerType,
  { payload }: Action<number>,
): StakeReducerType => {
  return {
    ...state,
    totalStaked: payload,
  };
}

const setStakedReducer = (
  state: StakeReducerType,
  { payload }: Action<number>,
): StakeReducerType => {
  return {
    ...state,
    staked: payload,
  };
}

const setTotalLockedReducer = (
  state: StakeReducerType,
  { payload }: Action<number>,
): StakeReducerType => {
  return {
    ...state,
    totalLocked: payload,
  };
}

const setTotalUnlockedReducer = (
  state: StakeReducerType,
  { payload }: Action<number>,
): StakeReducerType => {
  return {
    ...state,
    totalUnlocked: payload,
  };
}

export const stakeReducer = createReducer<StakeReducerType>(defaultState, {
  [ActionType.GEYSER_SET_ALLOWANCE]: setStakeTokenAllownaceReducer,
  [ActionType.GEYSER_SET_TOTAL_STAKED]: setTotalStakedReducer,
  [ActionType.GEYSER_SET_STAKED]: setStakedReducer,
  [ActionType.GEYSER_SET_TOTAL_LOCKED]: setTotalLockedReducer,
  [ActionType.GEYSER_SET_TOTAL_UNLOCKED]: setTotalUnlockedReducer,
});
