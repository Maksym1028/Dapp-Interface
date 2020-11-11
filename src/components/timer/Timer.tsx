import React from 'react';
import Timer from 'react-compound-timer';
import { getTimeLeft } from 'utils';
import Config from 'config';

interface Props {
  seconds: number;
  started: boolean;
  onEnd: () => void;
  onStart: () => void;
}

const withTimer = (timerProps: any) => (WrappedComponent: any) => (wrappedComponentProps: Props) => (
  <Timer
    {...timerProps}
    initialTime={wrappedComponentProps.seconds}
  >
    {(timerRenderProps: any) =>
      <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
  </Timer>
);

class CustomTimer extends React.Component {
  componentDidMount() {
    const { setCheckpoints, setTime, start } = (this.props as any).timer;
    const { onEnd, onStart, started } = (this.props as any);

    setCheckpoints([{
      time: 0,
      callback: () => {
        setTime(started ? 86400000 : 0);
        start();
        onEnd();
      }
    }, {
      time: (86400 - Config.Token.rebase.length) * 1000,
      callback: () => {
        onStart();
      }
    }]);
    if (started) {
      setTime(getTimeLeft(Config.Token.rebase.offset) * 1000);
      start();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="timer center-h centerhnew">
          <div className="timer__section">
            <b><Timer.Days /></b>
            <span className='greyme'>days</span>
          </div>
          <div className="timer__section">
            <b><Timer.Hours /></b>
            <span className='greyme'>hours</span>
          </div>
          <div className="timer__section">
            <b><Timer.Minutes /></b>
            <span className='greyme'>minutes</span>
          </div>
          <div className="timer__section">
            <b><Timer.Seconds /></b>
            <span className='greyme'>seconds</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const TimerHOC = withTimer({
    direction: 'backward',
    startImmediately: false,
})(CustomTimer);


export default TimerHOC;
