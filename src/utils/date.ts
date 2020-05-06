import * as globalMoment from 'moment';
import * as moment from 'moment-timezone';
import { DAY, MINUTE } from './../constants';

export function getNumberOfDaysBetweenMoments(start: globalMoment.Moment, end: globalMoment.Moment) {
  const daysDiff = end.diff(start, DAY);

  return daysDiff;
}

export function getTimeDiffInMin(date1: Date, date2: Date) {
  const a = moment(date1);
  const b = moment(date2);

  const diff = b.diff(a, MINUTE);

  return diff;
}