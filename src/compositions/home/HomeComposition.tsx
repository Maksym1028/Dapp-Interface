import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import Config from 'config';

import { Container, Header, Timer, ConnectWalletButton, Footer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import { selectTotalSupply } from 'store/token/tokenSelector';
import { numberWithDecimals, getTimeLeft, inWindow } from 'utils';
import { tokenRebase } from 'store/token/tokenActions';
import { stockclient, coingeckoclient } from 'lib';
//import { web3client } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  totalSupply: ReturnType<typeof selectTotalSupply>;
}
interface DispatchFromProps {
  rebase: typeof tokenRebase;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const HomeComposition = ({ account, totalSupply, rebase }: Props) => {
  const [rebaseEnable, setRebaseEnable] = React.useState<boolean>(inWindow(Config.Token.rebase.offset, Config.Token.rebase.length));
  const [tokenPrice, setTokenPrice] = React.useState<number>(0);
  const [rebaseTokenPrice, setRebaseTokenPrice] = React.useState<number>(0);

  useEffect(() => {
    stockclient.getTslaPrice().then(res => setRebaseTokenPrice(res));
    coingeckoclient.getYtslaPrice().then(res => setTokenPrice(res));
  }, [account]);
  /*useEffect(() => {
    const timeInterval = setInterval(() => {
      stockclient.getTslaPrice().then(res => setRebaseTokenPrice(res));
    }, 1800 * 1000);
    return () => clearInterval(timeInterval);
  });*/
  const renderTokenInfo = () => (
    <React.Fragment>
		  <div className='flex-h'>
      <Card className='card card-v transparent homeboxspace'>
        <CardContent className='boxsize'>
          <b>{numberWithDecimals(totalSupply, Config.Token.decimals, Config.Utils.decimals)}</b>
          <Typography className='greyme'>Total supply</Typography>
        </CardContent>
      </Card>
      <Card className='card card-v transparent'>
        <CardContent className='boxsize'>
          <b>{numberWithDecimals(( account ? account.balance : 0 ), Config.Token.decimals, Config.Utils.decimals)}</b>
          <Typography className='greyme'>{Config.Token.symbol} Balance</Typography>
        </CardContent>
      </Card>
	  </div>
    </React.Fragment>
  );

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

  return (
    <React.Fragment>
      <Header />
	    <Container>
        <div className='screen-center'>
		      <div className='home-info center-h'>
            <div className='home-info__container'>
              {renderTokenInfo()}
            </div>
          </div>	
			    <div className='center-h'>		  
		        <div className='ybullets'> • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •  </div>
		      </div>
          <div className='home-timer'>
            <h1 className='center-h redme'>{Config.Utils.homeText}</h1>
            <div className='center-h greyme'>
              {`${Config.Token.symbol} Price is $${numberWithDecimals(tokenPrice, 0, 2)}, ${Config.TargetToken.symbol} Price is $${numberWithDecimals(rebaseTokenPrice, 0, 2)}`}
            </div>
            <Timer
              started={!Config.Token.rebase.paused}
              seconds={!Config.Token.rebase.paused ? getTimeLeft(Config.Token.rebase.offset) * 1000 : 0}
              onEnd={() => setRebaseEnable(true)}
              onStart={() => setRebaseEnable(false)}
            />
            {Config.Token.rebase.paused ? (
              <div className='mb-10 center-h'>
                <span className='text-error'>We didn't start rebase yet.</span>
              </div>
            ) : null}
            <div className='center-h'>
              <Button variant='contained' className='btn-primary widebutt' disabled={(Config.Token.rebase.paused || !rebaseEnable)} onClick={rebase}>Rebase</Button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state),
    totalSupply: selectTotalSupply(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    rebase: () => dispatch(tokenRebase()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComposition)
