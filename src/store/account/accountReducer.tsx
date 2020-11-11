import { ActionType, Account, Action } from 'types';
import createReducer from 'store/config/createReducer';

export interface AccountReducerType {
    account?: Account;
}

export const defaultState: AccountReducerType = {
    account: undefined,
};

// reducers
const setAccountReducer = (
  state: AccountReducerType,
  { payload }: Action<Account | undefined>,
): AccountReducerType => {
  return {
      ...state,
      account: payload,
  };
}

export const accountReducer = createReducer<AccountReducerType>(defaultState, {
  [ActionType.SET_ACCOUNT]: setAccountReducer,
});
