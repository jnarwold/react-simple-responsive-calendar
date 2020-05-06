import { DAY, MINUTE } from '../../../constants';
import { getNumberOfDaysBetweenMoments } from '../../../utils/date';
import { orderBy } from 'lodash';
import * as moment from 'moment';
import * as React from 'react';
import { ICalendarEvent, IViewProps } from '../Calendar.d';
import * as classes from '../Calendar.scss';
import { getDateEvents, sortEventsByDates } from '../utils';
import { DayColumn } from './DayColumn';
import { HourColumn } from './HourColumn';
import { guid } from '../../../utils/guid';

class ColumnViewBase extends React.Component<IViewProps> {
  columnViewRef: any = null;

  componentDidUpdate(prevProps: IViewProps) {
    const { dateRangeStart, dateRangeEnd } = this.props;

    const startHasChanged = dateRangeStart !== prevProps.dateRangeStart;
    const endHasChanged = dateRangeEnd !== prevProps.dateRangeEnd;

    if (startHasChanged || endHasChanged)
      this.scrollToFirstEvent();
  }

  componentDidMount() {
    this.scrollToFirstEvent();
  }

  //#region Helpers

  numberOfDaysInDateRange = () => getNumberOfDaysBetweenMoments(
    this.props.dateRangeStart,
    this.props.dateRangeEnd
  )

  doesEventOverlapLastItemInColumn = (
    columns: ICalendarEvent[][],
    columnIndex: number,
    event: ICalendarEvent
  ) => {
    // base case, column is empty
    if (!columns[columnIndex])
      return false;

    const row = columns[columnIndex];
    const last = row[row.length - 1];

    // check if last item in this column overlaps
    const overlap = last.end > event.start;

    return overlap;
  }

  getColumnIndex = (columns: ICalendarEvent[][], event: ICalendarEvent) => {
    let index = 0;

    while (this.doesEventOverlapLastItemInColumn(columns, index, event)) {
      index++;
    }

    return index;
  }

  organizeEventColumns = (events: ICalendarEvent[]) => {
    const columns: ICalendarEvent[][] = [];

    events.forEach(event => {
      const i = this.getColumnIndex(columns, event);

      if (!columns[i])
        columns[i] = [];

      columns[i].push(event);
    });

    return columns;
  }

  scrollToFirstEvent = () => {
    const startTimes = this.props.calendarEvents.map(e => {
      const mStart = moment(e.start);
      const mStartOfDay = mStart.clone().startOf(DAY);
      return mStart.diff(mStartOfDay, MINUTE);
    });
    const orderedTimes = orderBy(startTimes);

    if (this.columnViewRef && orderedTimes)
      this.columnViewRef.scrollTop = orderedTimes[0];
  }

  //#endregion

  renderDayColumns = () => {
    const numberOfDays = this.numberOfDaysInDateRange();
    const dayColumns = [];

    for (let i = 0; i <= numberOfDays; i++) {
      const date = moment(this.props.dateRangeStart)
        .add(i, DAY)
        .toDate();
      const dayEvents = getDateEvents(date, this.props.calendarEvents);
      const sortedDayEvents = sortEventsByDates(dayEvents);
      const eventColumns = this.organizeEventColumns(sortedDayEvents);

      const dayColumnProps = {
        date, eventColumns,
        key: guid(),
        showDayLabel: numberOfDays > 1
      };
      const dayColumn = <DayColumn {...dayColumnProps} />;

      dayColumns.push(dayColumn);
    }

    return dayColumns;
  }

  render() {
    const props = {
      ref: (ref: HTMLDivElement) => this.columnViewRef = ref,
      className: classes.columnView
    };

    return (
      <div {...props}>
        <HourColumn />
        {this.renderDayColumns()}
      </div>
    );
  }
}

export const ColumnView = ColumnViewBase;