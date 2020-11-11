import { ActionType } from 'types';

export const setStakeTokenAllowance = (payload: number) => ({
  type: ActionType.GEYSER_SET_ALLOWANCE,
  payload,
});

export const loadAllowance = () => ({
  type: ActionType.GEYSER_LOAD_ALLOWANCE
});

export const loadStaked = () => ({
  type: ActionType.GEYSER_LOAD_STAKED
});

export const loadLocked = () => ({
  type: ActionType.GEYSER_LOAD_LOCKED
});

export const setTotalStaked = (payload: number) => ({
  type: ActionType.GEYSER_SET_TOTAL_STAKED,
  payload,
});

export const setStaked = (payload: number) => ({
  type: ActionType.GEYSER_SET_STAKED,
  payload,
});

export const setTotalLocked = (payload: number) => ({
  type: ActionType.GEYSER_SET_TOTAL_LOCKED,
  payload,
});

export const setTotalUnlocked = (payload: number) => ({
  type: ActionType.GEYSER_SET_TOTAL_UNLOCKED,
  payload,
});

export const approveStakingToken = () => {
  return {
    type: ActionType.GEYSER_APPROVE_TOKEN,
  };
};

export const stakeToken = (payload: number) => ({
  type: ActionType.GEYSER_GEYSER_TOKEN,
  payload,
});

export const unstakeToken = (payload: number) => ({
  type: ActionType.GEYSER_UNGEYSER_TOKEN,
  payload,
});
