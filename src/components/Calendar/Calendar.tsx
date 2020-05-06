import * as moment from 'moment';
import * as React from 'react';
import { DAY, MONTH, WEEK } from '../../constants/moment';
import { CalendarViewTypes } from '../../types/CalendarViewTypes';
import { IProps } from './Calendar.d';
import * as classes from './Calendar.scss';
import { ColumnView } from './parts/ColumnView';
import { GridView } from './parts/GridView';

class CalendarBase extends React.Component<IProps>
{
  renderDayView = () => {
    const { selectedDate, calendarEvents } = this.props;

    const startOfDay = moment(selectedDate)
      .startOf(DAY);
    const endOfDay = moment(selectedDate)
      .endOf(DAY);
    const filteredEvents = calendarEvents
      .filter(e => e.start >= startOfDay.toDate()
        && e.end <= endOfDay.toDate());

    const props = {
      calendarEvents: filteredEvents,
      dateRangeStart: startOfDay,
      dateRangeEnd: endOfDay
    };

    return <ColumnView {...props} />;
  }

  renderWeekView = () => {
    const { selectedDate, calendarEvents } = this.props;

    const startOfWeek = moment(selectedDate).startOf(WEEK).startOf(DAY);
    const endOfWeek = moment(selectedDate).endOf(WEEK).endOf(DAY);

    const filteredEvents = calendarEvents.filter(e => 
      e.start >= startOfWeek.toDate()
      && e.end <= endOfWeek.toDate());

    const props = {
      calendarEvents: filteredEvents,
      dateRangeStart: startOfWeek,
      dateRangeEnd: endOfWeek
    };

    return <ColumnView {...props} />;
  }

  renderMonthView = () => {
    const { selectedDate, calendarEvents, labels } = this.props;

    const startOfMonth = moment(selectedDate)
      .startOf(MONTH)
      .startOf(WEEK)
      .startOf(DAY);
    const endOfMonth = moment(selectedDate)
      .endOf(MONTH)
      .endOf(WEEK)
      .endOf(DAY);
    const filteredEvents = calendarEvents
      .filter(e => e.start >= startOfMonth.toDate()
        && e.end <= endOfMonth.toDate());

    const props = {
      labels,
      calendarEvents: filteredEvents,
      dateRangeStart: startOfMonth,
      dateRangeEnd: endOfMonth
    };

    return <GridView {...props} />;
  }

  renderView = () => {
    const { activeView } = this.props;

    let view = this.renderMonthView();

    if (activeView === CalendarViewTypes.Day)
      view = this.renderDayView();

    if (activeView === CalendarViewTypes.Week)
      view = this.renderWeekView();

    return (
      <div className={classes.calendar}>
        { view }        
      </div>
    ); 
  }

  render() {
    return (
      <React.Fragment>
        { this.props.legend }
        { this.renderView() }
      </React.Fragment>
    );
  }
}

export const Calendar = CalendarBase;