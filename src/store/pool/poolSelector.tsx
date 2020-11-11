import { RootState } from 'types';
import { PoolReducerType } from './poolReducer';
import { createSelector } from 'reselect';

export const selectPoolState = (state: RootState, props?: any): PoolReducerType => {
    return state.pool;
};

export const selectPoolInfo = createSelector(
  [ selectPoolState ],
  (state) => state.poolInfo,
);

export const selectPoolStakeTokenInfo = createSelector(
  [ selectPoolState ],
  (state) => state.stakeTokenInfo,
);

export const selectPoolContract = createSelector(
  [ selectPoolState ],
  (state) => state.contract,
);

export const selectPoolStakeTokenContract = createSelector(
  [ selectPoolState ],
  (state) => state.stakeTokenContract,
);

export const selectPoolStakeAllowed = createSelector(
    [ selectPoolState ],
    (state) => state.allowance > 0,
);

export const selectPoolStaked = createSelector(
  [ selectPoolState ],
  (state) => state.staked,
);

export const selectPoolEarned = createSelector(
  [ selectPoolState ],
  (state) => state.earned,
);

export const selectStakeTokenBalance = createSelector(
  [ selectPoolState ],
  (state) => state.stakeTokenBalance,
);

export const selectPoolTotalStaked = createSelector(
  [ selectPoolState ],
  (state) => state.totalStaked,
);

export const selectPoolPeriodFinish = createSelector(
  [ selectPoolState ],
  (state) => state.periodFinish,
);
