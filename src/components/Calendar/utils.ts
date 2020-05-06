import { ICalendarEvent } from './Calendar.d';

export const sortEventsByDates = (events: ICalendarEvent[]) => {
  const sortedEvents = [...events];

  sortedEvents.sort((a, b) => {
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;

    // start dates are equal

    if (a.end > b.end) return -1;
    if (a.end < b.end) return 1;

    return 0;
  });

  return sortedEvents;
};

export const getDateEvents = (date: Date, events: ICalendarEvent[]) => {
  const dateEvents = events.filter(e =>
    e.start.getFullYear() === date.getFullYear()
    && e.start.getMonth() === date.getMonth()
    && e.start.getDate() === date.getDate()
  );

  return dateEvents;
};