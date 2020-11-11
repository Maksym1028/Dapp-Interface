import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import { numberWithDecimals } from 'utils';
import Config from 'config';

interface OwnProps {
  open: boolean;
  dialogTitle: React.ReactElement;
  stakeToken: any;
  totalStaked: number;
  userBalance: number;
  staked: number;
  onClose: () => void;
  onUnstake: (amount: number) => void;
}

type Props = OwnProps;

const UnstakeDialog: React.FC<Props> = ({
  open,
  dialogTitle,
  staked,
  stakeToken,
  totalStaked,
  userBalance,
  onClose,
  onUnstake,
}: Props) => {
  const [unstakeAmount, setUnstakeAmount] = React.useState<string>('');

  const handleUnstake = () => {
    const _amount = parseFloat(unstakeAmount);
    const _balance = numberWithDecimals(staked, stakeToken.decimals, Config.Utils.decimals);
    if (_amount > _balance || _amount <= 0) {
      alert('Invalid withdraw amount');
    } else {
      onUnstake(_amount);
      onClose();
    }
  }

  const handleSetMax = () => {
    const _balance = numberWithDecimals(staked, stakeToken.decimals, Config.Utils.decimals);
    setUnstakeAmount(_balance.toString());
  }

  return (
    <Dialog onClose={onClose} open={open}>
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <div className='mb-10'>
            Total staked {stakeToken.symbol} by Community is &nbsp;
            <b>{numberWithDecimals(totalStaked, stakeToken.decimals, Config.Utils.decimals)}</b>
          </div>
          <span>
            Your {stakeToken.symbol} Balance is&nbsp;
            <b>{numberWithDecimals(userBalance, stakeToken.decimals, Config.Utils.decimals)}</b>
          </span>
          <span>
            Your Staked {stakeToken.symbol} Balance is&nbsp;
            <b>{numberWithDecimals(staked, stakeToken.decimals, Config.Utils.decimals)}</b>
          </span>
          <Button className='btn-stake__max' onClick={handleSetMax}>Max</Button>
          <TextField
            className='staking-input mt-50'
            variant='outlined'
            placeholder='Enter amount to withdraw'
            onChange={(event) => setUnstakeAmount(event.target.value)}
            value={unstakeAmount}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button className='btn-text' onClick={handleUnstake} >
            Withdraw
          </Button>
          <Button className='btn-text' onClick={onClose} >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  )
};

export default UnstakeDialog;
