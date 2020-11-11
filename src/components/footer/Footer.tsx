import React from 'react';
import { Container } from 'components';
import { Button } from '@material-ui/core';
import Config from 'config';

const Footer: React.FC = () => {
  return (
    <Container>
      <div className='footer'>
        <div>
          <p className='btn-text'>yTSLA is an experimental Parody token and has no affiliation with TESLA motors nor Elon Musk, nor MEME.   yTSLA was given away for free as a novelty airdrop and farm yield.    All original holders of yTSLA received it in a decentralized manner for no cost.    The inherent value of yTSLA is 0 and if it seems to be trading on the open market for more, be very aware that the value can return again to zero very quickly.  Only use this as a parody,  please do not take it seriously.</p>
        </div>
        <Button className='footer-item btn-text' href={`${Config.etherscan}${Config.Token.address}`} target='_blank' >yTSLA Contract</Button>
        <Button className='footer-item btn-text' href='https://app.uniswap.org' target='_blank' >Uniswap YTSLA-ETH</Button>
        <Button className='footer-item btn-text' href='https://twitter.com/yTSLAFi' target='_blank' >Twitter</Button>
        <Button className='footer-item btn-text' href='https://t.me/yTSLA_lounge' target='_blank' >Telegram</Button>
      </div>
    </Container>
  )
}

export default Footer;
