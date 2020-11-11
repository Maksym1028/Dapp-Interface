import { ActionType } from 'types';
import createReducer from 'store/config/createReducer';
import {
    setLoadingReducer,
} from './reducers';

export interface BasicReducerType {
    loading: boolean;
}

export const defaultState: BasicReducerType = {
    loading: false,
};

export const basicReducer = createReducer<BasicReducerType>(defaultState, {
    [ActionType.SET_LOADING]: setLoadingReducer,
});