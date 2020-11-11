import { RootState } from 'types';
import { BasicReducerType } from './basicReducer';
import { createSelector } from 'reselect';

export const selectBasicState = (state: RootState, props?: any): BasicReducerType => {
    return state.basic;
};

export const selectIsLoading = createSelector(
    [ selectBasicState ],
    (basicState) => basicState.loading,
);
