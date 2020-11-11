import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import { numberWithDecimals } from 'utils';
import Config from 'config';

interface OwnProps {
  open: boolean;
  dialogTitle: React.ReactElement;
  poolBalance: number;
  stakeToken: any;
  totalStaked: number;
  userBalance: number;
  onClose: () => void;
  onStake: (amount: number) => void;
}

type Props = OwnProps;

const StakeDialog: React.FC<Props> = ({
  open,
  dialogTitle,
  poolBalance,
  stakeToken,
  totalStaked,
  userBalance,
  onClose,
  onStake,
}: Props) => {
  const [stakeAmount, setStakeAmount] = React.useState<string>('');

  const handleStake = () => {
    const _amount = parseFloat(stakeAmount);
    const _balance = numberWithDecimals(userBalance, stakeToken.decimals, Config.Utils.decimals, true);
    if (_amount > _balance || _amount <= 0) {
      alert('Invalid stake amount');
    } else {
      onStake(_amount);
      onClose();
    }
  }

  const handleSetMax = () => {
    const _balance = numberWithDecimals(userBalance, stakeToken.decimals, Config.Utils.decimals, true);
    setStakeAmount(_balance.toString());
  }

  return (
    <Dialog onClose={onClose} open={open}>
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <div className='mb-10 text-small'>
            Community distributes <b>{poolBalance}</b>&nbsp; {Config.Token.symbol} as rewards
          </div>
          <div className='mb-10'>
            Total staked {stakeToken.symbol} by Community is &nbsp;
            <b>{numberWithDecimals(totalStaked, stakeToken.decimals, Config.Utils.decimals)}</b>
          </div>
          <span>
            Your {stakeToken.symbol} Balance is&nbsp;
            <b>{numberWithDecimals(userBalance, stakeToken.decimals, Config.Utils.decimals)}</b>&nbsp;
          </span>
          <Button className='btn-stake__max' onClick={handleSetMax}>Max</Button>
          <TextField
            className='staking-input mt-50'
            variant='outlined'
            placeholder='Enter amount to stake'
            onChange={(event) => setStakeAmount(event.target.value)}
            value={stakeAmount}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button className='btn-text' onClick={handleStake} >
            Stake
          </Button>
          <Button className='btn-text' onClick={onClose} >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  )
};

export default StakeDialog;
