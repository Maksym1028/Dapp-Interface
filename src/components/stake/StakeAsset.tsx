import React from 'react';
import { Button, Card, CardContent, Fab } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';
import { StakeDialog, UnstakeDialog } from 'components';

interface OwnProps {
  tokenInfo: any;
  allowed: boolean;
  started: boolean;
  staked: number;
  totalStaked: number;
  balance: number;
  onApprove: () => void;
  onStake: (amount: number) => void;
  onUnstake: (amount: number) => void;
}

type Props = OwnProps;

export const StakeAsset = ({ totalStaked, staked, allowed, onApprove, onStake, onUnstake, balance, tokenInfo, started }: Props) => {
  const [stakeDialogOpen, setStakeDialogOpen] = React.useState<boolean>(false);
  const [unstakeDialogOpen, setUnstakeDialogOpen] = React.useState<boolean>(false);

  return (
    <Card className='card card-h medium transparent'>
      <CardContent>
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={tokenInfo.image} alt={tokenInfo.name} />
          </div>
          <div className='center-h boxsize'>
            <h2>{tokenInfo.name}</h2>
          </div>
          <div className='center-h boxsize mt-20'>
            <span className='text-number'>
              {numberWithDecimals(staked, tokenInfo.decimals, Config.Utils.decimals)}
            </span>
          </div>
          <div className='center-h mb-20'>
            <span className='text-small'>{`${tokenInfo.symbol} Staked`}</span>
          </div>
        </div>
        {!allowed ? (
          <React.Fragment>
            <div className='section'>
              <div className='mt-20' />
              <div className='center-h'>
                <Button
                  variant='contained'
                  className='btn-primary'
                  onClick={onApprove}
                >
                  {`Approve ${tokenInfo.symbol}`}
                </Button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className='section'>
            <div className='center-h mt-20'>
              <Fab className='btn-fab mr-20' disabled={staked <= 0} onClick={() => setUnstakeDialogOpen(true)}>-</Fab>
              <Fab className='btn-fab' disabled={!started} onClick={() => setStakeDialogOpen(true)}>+</Fab>
            </div>
          </div>
        )}
      </CardContent>

      <StakeDialog
        open={stakeDialogOpen}
        poolBalance={Config.Pool.balance}
        stakeToken={tokenInfo}
        totalStaked={totalStaked}
        userBalance={balance}
        dialogTitle={(
          <div className="center-v">
            <img className="logo-image" src={tokenInfo.image} alt={tokenInfo.name} />
            <span className="logo-text">{`Stake ${tokenInfo.symbol}`}</span>
          </div>
        )}
        onStake={onStake}
        onClose={() => setStakeDialogOpen(false)}
      />
      <UnstakeDialog
        open={unstakeDialogOpen}
        stakeToken={tokenInfo}
        totalStaked={totalStaked}
        staked={staked}
        userBalance={balance}
        dialogTitle={(
          <div className="center-v">
            <img className="logo-image" src={tokenInfo.image} alt={tokenInfo.name} />
            <span className="logo-text">{`Withdraw ${tokenInfo.symbol}`}</span>
          </div>
        )}
        onUnstake={onUnstake}
        onClose={() => setUnstakeDialogOpen(false)}
      />
    </Card>
  )
}

export default StakeAsset;

