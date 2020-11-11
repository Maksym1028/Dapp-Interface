import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Config from 'config';

import { Container, Header, Footer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import PoolCard from './PoolCard';

import Farm1Icon from 'assets/img/token-stake.png';
import Farm2Icon from 'assets/img/token-uni.png';
import Farm3Icon from 'assets/img/token-lp.png';
import { coingeckoclient, web3client, dexclient } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const FarmComposition = () => {
  const [tokenPrice, setTokenPrice] = React.useState<number>(0);
  const [pool1APY, setPool1APY] = React.useState<number>(0);
  const [pool2APY, setPool2APY] = React.useState<number>(0);
  const [pool3APY, setPool3APY] = React.useState<number>(0);
  useEffect(() => {
    coingeckoclient.getYtslaPrice().then(res => setTokenPrice(res));
  });
  useEffect(() => {
    if (tokenPrice > 0) {
      coingeckoclient.getMemePrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool1Contract).then(res => {
            const roi = res * tokenPrice / Math.pow(10, 28) / price * 86400 * 365 * 100;
            setPool1APY(roi);
        });
      });

      coingeckoclient.getUniPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool2Contract).then(res => {
            const roi = res * tokenPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
            setPool2APY(roi);
        });
      });

      dexclient.getLpTokenPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool3Contract).then(res => {
          const roi = res * tokenPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool3APY(roi);
        });
      });
    }
  }, [tokenPrice]);

  return (
    <React.Fragment>
      <Header />
      <Container>
        <div className='flex-v screen-center'>
          <div className='mt-30 mb-20 center-h'>
          </div>
          <div className='mb-20'>
            <div className='center-h text-title mb-10'>
              Select a farm
            </div>
            <div className='center-h text-small'>
              Earn {Config.Token.symbol} tokens by providing liquidity
            </div>
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard stakingToken={Config.MemeToken} picture={Farm1Icon} poolUrl='/farm-meme' apy={pool1APY} rewardPercent={16.33} />
            <PoolCard stakingToken={Config.UniToken} picture={Farm2Icon} poolUrl='/farm-uni' apy={pool2APY} rewardPercent={16.33} />
            <PoolCard stakingToken={Config.UniLpToken} picture={Farm3Icon} poolUrl='/farm-lp' apy={pool3APY} rewardPercent={67.34} />
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
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmComposition)
