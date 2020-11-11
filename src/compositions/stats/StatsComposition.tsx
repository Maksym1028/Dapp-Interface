import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'types';
import { Header, Container, Footer } from 'components';

import Pool1Stats from './Pool1Stats';
import Pool2Stats from './Pool2Stats';
import Pool3Stats from './Pool3Stats';
import { coingeckoclient } from 'lib';


interface StateFromProps {}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const StatsComposition = () => {
  const [price, setPrice] = React.useState<number>(0);
  useEffect(() => {
    coingeckoclient.getYtslaPrice().then(res => setPrice(res));
  });

  return (
    <React.Fragment>
      <Header />
      <Container>
        <div className='screen-center flex-v'>
          <div className='flex-h'>
            <div className='card halfcard mr-30'>
              <Pool1Stats tokenPrice={price} />
            </div>
            <div className='card halfcard mr-30'>
              <Pool2Stats tokenPrice={price} />
            </div>
            <div className='card halfcard'>
              <Pool3Stats tokenPrice={price} />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
};
//<div className='text-error'>The stats page is still being updated and will be ready within 48 hours. thank you for your patience</div>
function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsComposition);
