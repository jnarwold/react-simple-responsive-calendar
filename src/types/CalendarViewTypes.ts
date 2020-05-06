export enum CalendarViewTypes {
  Undefined = 0,
  Day = 1,
  Week = 2,
  Month = 3
}

export const getMappedType = (type: CalendarViewTypes) => {
  if (type === CalendarViewTypes.Day)
    return 'day';
  if (type === CalendarViewTypes.Month)
    return 'month';
  if (type === CalendarViewTypes.Week)
    return 'week';
};