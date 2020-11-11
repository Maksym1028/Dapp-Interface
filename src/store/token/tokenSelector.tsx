import { RootState } from 'types';
import { TokenReducerType } from './tokenReducer';
import { createSelector } from 'reselect';

export const selectTokenState = (state: RootState, props?: any): TokenReducerType => {
    return state.token;
};

export const selectTotalSupply = createSelector(
    [ selectTokenState ],
    (state) => state.totalSupply,
);
