import { ActionType } from 'types';

export const loadTotalSupply = () => {
    return {
        type: ActionType.TOKEN_LOAD_TOTAL_SUPPLY
    };
};

export const setTotalSupply = (
    payload: number
) => {
    return {
        type: ActionType.TOKEN_SET_TOTAL_SUPPLY,
        payload,
    };
};

export const tokenRebase = () => {
    return {
        type: ActionType.TOKEN_REBASE,
    }
}
