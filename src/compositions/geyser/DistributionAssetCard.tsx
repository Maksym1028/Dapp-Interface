import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Card, CardContent, Divider } from '@material-ui/core';
import { RootState } from 'types';
import Config from 'config';
import { selectTotalLocked, selectTotalUnlocked } from 'store/stake/stakeSelector';
import { numberWithDecimals } from 'utils';
import DistributeTokenImage from 'assets/img/token-distribute.png';

interface StateFromProps {
  totalLocked: ReturnType<typeof selectTotalLocked>;
  totalUnlocked: ReturnType<typeof selectTotalUnlocked>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const DistributionAssetCard = ({ totalLocked, totalUnlocked }: Props) => {
  return (
    <Card className='card card-h transparent'>
      <CardContent>
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={DistributeTokenImage} alt='LinkStepper' />
          </div>
          <div className='center-h'>
            <h2>{`${Config.Token.name} (${Config.Token.symbol})`}</h2>
          </div>
          <div className='center-h'>
            Total Locked :&nbsp;
            <span>{numberWithDecimals(totalLocked, Config.Token.decimals, Config.Utils.decimals)}</span>
          </div>
        </div>
        <Divider />
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            Total Unlocked :&nbsp;
            <span>{numberWithDecimals(totalUnlocked, Config.Token.decimals, Config.Utils.decimals)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    totalLocked: selectTotalLocked(state),
    totalUnlocked: selectTotalUnlocked(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DistributionAssetCard);

