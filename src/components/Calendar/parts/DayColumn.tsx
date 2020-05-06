import { TIME_FORMAT } from '../../../constants';
import { getTimeDiffInMin } from '../../../utils/date';
import { guid } from '../../../utils/guid';
import * as moment from 'moment';
import * as React from 'react';
import { ICalendarEvent, IDayColumnProps } from '../Calendar.d';
import * as classes from '../Calendar.scss';
import { EventCard } from './EventCard';

class DayColumnBase extends React.Component<IDayColumnProps> {

  renderEventCard = (event: ICalendarEvent) => {
    const { start, end } = event;

    const eventLengthMins = getTimeDiffInMin(start, end);

    const hours = start.getHours();
    const mins = start.getMinutes();
    const totalMins = (hours * 60) + mins;

    const style = {
      top: `${totalMins}px`,
      height: `${eventLengthMins}px`
    };

    const props = {
      event, style,
      showStartTime: false,
      showTimeBorder: true,
      key: guid()
    };

    return (<EventCard {...props} />);
  }

  renderEventColumn = (eventColumn: ICalendarEvent[]) => {
    const props = {
      key: guid(),
      className: classes.eventColumn
    };
    const eventCards = eventColumn.map(this.renderEventCard);

    return (
      <div {...props}>
        {eventCards}
      </div>
    );
  }

  renderEventColumns = () => {
    const eventColumns = this.props.eventColumns.map(this.renderEventColumn);

    return (
      <div className={classes.eventColumnWrapper}>
        {eventColumns}
      </div>
    );
  }

  renderDayColumnHeaderLabel = (date: Date) => {
    const mDate = moment(date);
    const dayOfMonthLabel = mDate.format(TIME_FORMAT.DAY_OF_MONTH);
    const dayOfWeekLabel = mDate.format(TIME_FORMAT.DAY_OF_WEEK);

    return (
      <React.Fragment>
        <span className={classes.dayOfMonthHeaderLabel}>
          {dayOfMonthLabel}
        </span>
        <span className={classes.dayOfWeekHeaderLabel}>
          {dayOfWeekLabel}
        </span>
      </React.Fragment>
    );
  }

  renderDayLabel = () => {
    const { date, showDayLabel } = this.props;

    const label = showDayLabel
      ? this.renderDayColumnHeaderLabel(date)
      : null;
    const props = {
      key: `day-label-${guid()}`,
      className: classes.dayLabel
    };

    return (<div {...props}>{ label }</div>);
  }

  renderHalfHourRows = () => {
    const rows = [];

    for (let i = 0; i <= 48; i++) 
      rows.push(<li key={i}></li>);

    const props = {
      key: guid(),
      className: classes.halfHourRows
    };

    return (
      <ul {...props}>
        { rows }
      </ul>
    );
  }

  render() {
    return (
      <div className={classes.dayColumn}>
        { this.renderHalfHourRows() }
        { this.renderDayLabel() }
        { this.renderEventColumns() }
      </div>
    );
  }
}

export const DayColumn = DayColumnBase;
