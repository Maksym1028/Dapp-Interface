import { ActionType } from 'types';

export const setLoading = (
    payload: boolean
) => {
    return {
        type: ActionType.SET_LOADING,
        payload,
    };
};
