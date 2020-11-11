import { RootState } from 'types';
import { StakeReducerType } from './stakeReducer';
import { createSelector } from 'reselect';

export const selectStakeState = (state: RootState, props?: any): StakeReducerType => {
    return state.stake;
};

export const selectStakingTokenAllowance = createSelector(
    [ selectStakeState ],
    (state) => state.allowance,
);

export const selectTotalStaked = createSelector(
  [ selectStakeState ],
  (state) => state.totalStaked,
);

export const selectStaked = createSelector(
  [ selectStakeState ],
  (state) => state.staked,
);

export const selectTotalLocked = createSelector(
  [ selectStakeState ],
  (state) => state.totalLocked,
);

export const selectTotalUnlocked = createSelector(
  [ selectStakeState ],
  (state) => state.totalUnlocked,
);
