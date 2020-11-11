import { RootState } from 'types';
import { AccountReducerType } from './accountReducer';
import { createSelector } from 'reselect';

export const selectAccountState = (state: RootState, props?: any): AccountReducerType => {
    return state.account;
};

export const selectAccount = createSelector(
    [ selectAccountState ],
    (state) => state.account,
);
