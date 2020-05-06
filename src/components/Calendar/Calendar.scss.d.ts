declare namespace CalendarScssModule {
  export interface ICalendarScss {
    calendar: string;
    columnView: string;
    content: string;
    dayBlock: string;
    dayColumn: string;
    dayLabel: string;
    dayOfMonthHeaderLabel: string;
    dayOfWeekHeaderLabel: string;
    dayOfWeekLabel: string;
    eventCard: string;
    eventColumn: string;
    eventColumnWrapper: string;
    eventWrapper: string;
    gridView: string;
    halfHourRows: string;
    hourColumn: string;
    minuteBorder: string;
    openings: string;
    showMoreButton: string;
    showMoreDrawer: string;
    showMoreMenuContent: string;
    title: string;
  }
}

declare const CalendarScssModule: CalendarScssModule.ICalendarScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CalendarScssModule.ICalendarScss;
};

export = CalendarScssModule;
