import { HOUR, TIME_FORMAT } from '../../../constants';
import * as moment from 'moment';
import * as React from 'react';
import * as classes from '../Calendar.scss';

class HourColumnBase extends React.Component {
  renderHourlyLabel = (hour: number) => {
    const startOfDay = moment().hour(0);
    const label = startOfDay
      .clone()
      .add(hour, HOUR)
      .format(TIME_FORMAT.HOUR_ONLY);
  
    return (
      <li key={`hourlyLabelRow-${hour}`}>
        {label}
      </li>
    );
  }
  
  renderHourlyLabels = () => {
    const renderedLabels = [];
  
    for (let i = 0; i <= 24; i++)
      renderedLabels.push(this.renderHourlyLabel(i));
  
    return renderedLabels;
  }
  
  render() {  
    return (
      <ul className={classes.hourColumn} >
        { this.renderHourlyLabels() }
      </ul>
    );
  }
}

export const HourColumn = HourColumnBase;