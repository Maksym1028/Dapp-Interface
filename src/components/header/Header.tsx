import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Container } from 'components';
import { selectAccount } from 'store/account/accountSelector';
import { RootState } from 'types';
import { truncateAddress } from 'utils';
import Config from 'config';
import Logo from 'assets/img/logo.png';
import { loadAccount } from 'store/account/accountActions';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {
  loadAccount: typeof loadAccount;
}
type Props = StateFromProps & DispatchFromProps & RouteComponentProps;

const Header: React.FC<Props> = ({ account, history, loadAccount }: Props) => {
  return (
    <Container>
      <div className="nav-header">
        <div className="center-v">
			    <img src={Logo} width='152' alt='yTSLA' />
        </div>
        <div className="flex-h">
          <Button className='btn-text' onClick={() => history.push('/')} >Home</Button>
          <Button className='btn-text' onClick={() => history.push('/farm')} >Farm</Button>
          <Button className='btn-text' onClick={() => history.push('/stats')} >Stats</Button>
		      <Button className='btn-text' onClick={() => history.push('/dashboard')} disabled >Dashboard</Button>
        </div>
        {account ? (
          <Button
            variant='contained'
            className='btn-header'
            href={`${Config.etherscan}${account.address}`}
            target='_blank'
          >{truncateAddress(account.address)}</Button>
        ) : (
          <Button
            variant='contained'
            className='btn-header'
            onClick={loadAccount}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </Container>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    loadAccount: () => dispatch(loadAccount()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
