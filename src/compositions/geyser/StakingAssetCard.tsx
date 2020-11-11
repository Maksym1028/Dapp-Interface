import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Divider } from '@material-ui/core';
import { RootState } from 'types';
import Config from 'config';
import { selectTotalStaked, selectStaked, selectStakingTokenAllowance } from 'store/stake/stakeSelector';
import { approveStakingToken } from 'store/stake/stakeActions';
import { numberWithDecimals } from 'utils';
import StakeTokenImage from 'assets/img/token-meme.png';

interface StateFromProps {
  totalStaked: ReturnType<typeof selectTotalStaked>;
  staked: ReturnType<typeof selectStaked>;
  allowance: ReturnType<typeof selectStakingTokenAllowance>;
}
interface DispatchFromProps {
  approve: typeof approveStakingToken;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const StakingAssetCard = ({ totalStaked, staked, allowance, approve }: Props) => {
  return (
    <Card className='card card-h transparent'>
      <CardContent>
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={StakeTokenImage} alt={Config.MemeToken.name} />
          </div>
          <div className='center-h'>
            <h2>{`${Config.MemeToken.name} (${Config.MemeToken.symbol})`}</h2>
          </div>
          <div className='center-h'>
            Total Staked :&nbsp;
            <span>{numberWithDecimals(totalStaked, Config.MemeToken.decimals, Config.Utils.decimals)}</span>
          </div>
        </div>
        <Divider />
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            Staked :&nbsp;
            <span>{numberWithDecimals(staked, Config.MemeToken.decimals, Config.Utils.decimals)}</span>
          </div>
        </div>
        {allowance <= 0 ? (
          <React.Fragment>
            <Divider />
            <div className='section'>
              <div className='mt-20' />
              <div className='center-h'>
                <Button
                  variant='contained'
                  className='btn-primary'
                  onClick={() => approve()}
                >
                  {`Approve ${Config.MemeToken.symbol}`}
                </Button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </CardContent>
    </Card>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    totalStaked: selectTotalStaked(state),
    staked: selectStaked(state),
    allowance: selectStakingTokenAllowance(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    approve: () => dispatch(approveStakingToken())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StakingAssetCard);

