import { ActionType, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface TokenReducerType {
  totalSupply: number;
}

export const defaultState: TokenReducerType = {
  totalSupply: 0,
};

// reducers
const setTotalSupplyReducer = (
  state: TokenReducerType,
  { payload }: Action<number>,
): TokenReducerType => {
  return {
    ...state,
    totalSupply: payload,
  };
}

export const tokenReducer = createReducer<TokenReducerType>(defaultState, {
  [ActionType.TOKEN_SET_TOTAL_SUPPLY]: setTotalSupplyReducer,
});
