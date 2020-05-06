import { CalendarViewTypes } from '../../types/CalendarViewTypes';
import * as moment from 'moment';
import { CSSProperties } from 'react';

export interface ICalendarLabels {
  hideShowMoreDrawer?: string;
}

export interface IProps {
  activeView: CalendarViewTypes;
  selectedDate: Date;
  legend?: JSX.Element;
  calendarEvents: ICalendarEvent[];
  labels: ICalendarLabels;
}

export interface IViewProps {
  dateRangeStart: moment.Moment;
  dateRangeEnd: moment.Moment;
  calendarEvents: ICalendarEvent[];
  labels?: ICalendarLabels;
}

export interface ICalendarEvent {
  start: Date;
  end: Date;
  title?: string;
  openings?: number;
  onClick?(): void;
}

export interface IEventCardProps {
  event: ICalendarEvent;
  className?: string;
  style?: CSSProperties;
  showStartTime?: boolean;
  showTimeBorder?: boolean;
}

export interface IDayColumnProps {
  date: Date;
  eventColumns: ICalendarEvent[][];
  showDayLabel?: boolean;
}