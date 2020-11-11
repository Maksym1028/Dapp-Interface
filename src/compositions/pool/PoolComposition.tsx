import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'types';
import { Button } from '@material-ui/core';

import Config from 'config';
import { Container, Header, Footer, ConnectWalletButton, RewardAsset, StakeAsset } from 'components';
import {
  poolStake,
  poolWithdraw,
  poolApproveToken,
  poolHarvest,
  poolExit,
  poolGetStaked,
  poolGetEarned,
} from 'store/pool/poolActions';
import {
  selectPoolStaked,
  selectPoolEarned,
  selectPoolStakeAllowed,
  selectStakeTokenBalance,
  selectPoolTotalStaked,
  selectPoolPeriodFinish,
  selectPoolStakeTokenInfo,
  selectPoolInfo
} from 'store/pool/poolSelector';
import { selectAccount } from 'store/account/accountSelector';
import { getDateLeft, secondsToDays, secondsToHours, secondsToMinutes, secondsToSeconds, getEstimatedPercent } from 'utils';
import { ethscanclient } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  staked: ReturnType<typeof selectPoolStaked>;
  earned: ReturnType<typeof selectPoolEarned>;
  allowed: ReturnType<typeof selectPoolStakeAllowed>;
  totalStaked: ReturnType<typeof selectPoolTotalStaked>
  stakeTokenBalance: ReturnType<typeof selectStakeTokenBalance>;
  deadline: ReturnType<typeof selectPoolPeriodFinish>;
  stakeTokenInfo: ReturnType<typeof selectPoolStakeTokenInfo>;
  poolInfo: ReturnType<typeof selectPoolInfo>;
}
interface DispatchFromProps {
  stake: typeof poolStake;
  unstake: typeof poolWithdraw;
  approve: typeof poolApproveToken;
  harvest: typeof poolHarvest;
  exit: typeof poolExit;
  loadStaked: typeof poolGetStaked;
  loadEarned: typeof poolGetEarned;
}

type Props = StateFromProps & DispatchFromProps;

const PoolComposition: React.FC<Props> = ({
  account,
  allowed,
  staked,
  totalStaked,
  stakeTokenBalance,
  deadline,
  approve,
  stake,
  unstake,
  earned,
  harvest,
  exit,
  loadEarned,
  loadStaked,
  stakeTokenInfo,
  poolInfo,
}) => {
  const [timeLeft, setTimeLeft] = React.useState<number>(0);
  const [estimatePercent, setEstimatePercent] = React.useState<number>(0);

  useEffect(() => setTimeLeft(getDateLeft(deadline)), [deadline]);
  useEffect(() => {
    const timeInterval = setInterval(() => setTimeLeft(getDateLeft(deadline)), 1000);
    return () => clearInterval(timeInterval);
  });
  useEffect(() => {
    if (allowed) {
      
      loadEarned(); loadStaked();
      ethscanclient.getTransactionsCount(poolInfo.address).then(res => 
        setEstimatePercent(getEstimatedPercent(res)));
      const timeInterval = setInterval(() => { loadEarned(); loadStaked(); ethscanclient.getTransactionsCount(poolInfo.address); }, 60000);
      return () => clearInterval(timeInterval);
    }
  });


  if (!account) {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <div className='screen-center flex-v'>
            <ConnectWalletButton />
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    )
  }

  if (!stakeTokenInfo) return <></>;

  return (
    <React.Fragment>
      <Header />
      <Container>
        <div className='flex-v screen-center'>
          <div className='mb-20'>
            <div className='center-h text-title mb-10'>
              {`Deposit ${stakeTokenInfo.symbol} and earn ${Config.Token.symbol}`}
            </div>
            <div className={`center-h ${timeLeft > 0 ? 'text-small' : 'text-error'}`}>
              {timeLeft > 0 ? 
                `Time Left : ${secondsToDays(timeLeft)} day(s), ${secondsToHours(timeLeft)} hour(s), ${secondsToMinutes(timeLeft)} minute(s), ${secondsToSeconds(timeLeft)} second(s)` :
                `The Pool is not open yet, please check our telegram.`}
            </div>
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <RewardAsset
              earned={earned}
              percent={estimatePercent}
              onHarvest={harvest}
            />
            <StakeAsset
              tokenInfo={stakeTokenInfo}
              allowed={allowed}
              started={timeLeft > 0}
              staked={staked}
              totalStaked={totalStaked}
              balance={stakeTokenBalance}
              onApprove={approve}
              onStake={(amount: number) => stake(amount)}
              onUnstake={unstake}
            />
          </div>
          <div className='center-h mt-20 mb-30'>
            <Button
              variant='contained'
              className='btn-primary exit'
              disabled={staked <= 0}
              onClick={exit}
            >
              Harvest & Withdraw
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
};

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state),
    totalStaked: selectPoolTotalStaked(state),
    staked: selectPoolStaked(state),
    allowed: selectPoolStakeAllowed(state),
    earned: selectPoolEarned(state),
    stakeTokenBalance: selectStakeTokenBalance(state),
    deadline: selectPoolPeriodFinish(state),
    stakeTokenInfo: selectPoolStakeTokenInfo(state),
    poolInfo: selectPoolInfo(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    stake: (payload: number) => dispatch(poolStake(payload)),
    unstake: (payload: number) => dispatch(poolWithdraw(payload)),
    approve: () => dispatch(poolApproveToken()),
    harvest: () => dispatch(poolHarvest()),
    exit: () => dispatch(poolExit()),
    loadEarned: () => dispatch(poolGetEarned()),
    loadStaked: () => dispatch(poolGetStaked()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PoolComposition);
