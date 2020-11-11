import { BasicReducerType } from 'store/app/basicReducer';
import { AccountReducerType } from 'store/account/accountReducer';
import { TokenReducerType } from 'store/token/tokenReducer';
import { StakeReducerType } from 'store/stake/stakeReducer';
import { PoolReducerType } from 'store/pool/poolReducer';

export interface RootState {
    basic: BasicReducerType;
    account: AccountReducerType;
    token: TokenReducerType;
    stake: StakeReducerType;
    pool: PoolReducerType;
}
