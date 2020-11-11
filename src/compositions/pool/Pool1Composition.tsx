import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'types';

import Config from 'config';
import { web3client } from 'lib';
import {
  poolSetPoolInfo,
  poolSetContract,
  poolSetStakeTokenInfo,
  poolSetStakeTokenContract,
  poolLoadAllowance,
  poolGetPeriodFinish,
} from 'store/pool/poolActions';
import PoolComposition from './PoolComposition';

interface StateFromProps {}
interface DispatchFromProps {
  setPoolInfo: typeof poolSetPoolInfo;
  setStakeTokenInfo: typeof poolSetStakeTokenInfo;
  setPoolContract: typeof poolSetContract;
  setStakeTokneContract: typeof poolSetStakeTokenContract;
  loadAllowance: typeof poolLoadAllowance;
  loadPeriodFinish: typeof poolGetPeriodFinish;
}

type Props = StateFromProps & DispatchFromProps;

const Pool1Composition: React.FC<Props> = ({
  setPoolInfo,
  setStakeTokenInfo,
  setPoolContract,
  setStakeTokneContract,
  loadAllowance,
  loadPeriodFinish,
}) => {

  useEffect(() => {
    setPoolInfo(Config.Pool1);
    setStakeTokenInfo(Config.MemeToken);
    setPoolContract(web3client.pool1Contract);
    setStakeTokneContract(web3client.memeTokenContract);
    loadAllowance();
    loadPeriodFinish();
  });

  return (
    <PoolComposition />
  )
};

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    loadAllowance: () => dispatch(poolLoadAllowance()),
    loadPeriodFinish: () => dispatch(poolGetPeriodFinish()),
    setPoolInfo: (payload: any) => dispatch(poolSetPoolInfo(payload)),
    setStakeTokenInfo: (payload: any) => dispatch(poolSetStakeTokenInfo(payload)),
    setPoolContract: (payload: any) => dispatch(poolSetContract(payload)),
    setStakeTokneContract: (payload: any) => dispatch(poolSetStakeTokenContract(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pool1Composition);
