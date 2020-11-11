import {  Action } from 'types';
import { BasicReducerType } from '../basicReducer';

export const setLoadingReducer = (
    state: BasicReducerType,
    { payload }: Action<boolean>,
): BasicReducerType => {
    return {
        ...state,
        loading: payload,
    };
}
