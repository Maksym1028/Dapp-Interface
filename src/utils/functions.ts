import moment from 'moment';

export const numberWithDecimals = (value: number, divideDecimals: number, showDecimals: number, isNumber?: boolean) => {
  const _value = value / Math.pow(10, divideDecimals);
  const _decimals = Math.pow(10, showDecimals);
  const _res = Math.floor(_value * _decimals) / _decimals;
  if (!isNumber) return _res.toFixed(showDecimals);
  return _res;
}

export const inWindow = (time: number, offsetSec: number) => {
  const now = moment.utc();
  const startHour = Math.floor(time);
  const startMin = Math.floor((time - startHour) * 60);
  
  const start = now.clone().hour(startHour).minute(startMin).second(0);
  const end = start.clone().add(offsetSec, 'seconds');
  
  return now.isBetween(start, end);
}

export const getTimeLeft = (deadline: number) => {
  const now = moment.utc();
  const deadlineHour = Math.floor(deadline);
  const deadlineMin = Math.floor((deadline - deadlineHour) * 60);
  
  const _deadline = now.clone().hour(deadlineHour).minute(deadlineMin).second(0);
  if (now.isAfter(_deadline)) {
    const tomorrow = moment.utc(new Date()).add(1, 'days').hour(deadlineHour).minute(deadlineMin).second(0);
    return tomorrow.diff(now, "seconds");
  } else {
    return _deadline.diff(now, "seconds");
  }
}

export const getDateLeft = (date: Date) => {
  const now = moment.utc();
  const deadline = moment.utc(date);
  if (now.isAfter(deadline)) {
    return 0;
  } else {
    return deadline.diff(now, "seconds");
  }
}

export const secondsToDays    = (seconds: number) => Math.floor(seconds / (3600*24));
export const secondsToHours   = (seconds: number) => Math.floor(seconds % (3600*24) / 3600);
export const secondsToMinutes = (seconds: number) => Math.floor(seconds % 3600 / 60);
export const secondsToSeconds = (seconds: number) => Math.floor(seconds % 60);

export const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
}

export const getEstimatedPercent = (txCount: number) => {
  const rate = 1 - (txCount / 600);
  if (rate > 0.3) return 0.3;
  if (rate < 0.05) return 0.05;
  return rate;
}
