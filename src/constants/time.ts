export const TIME = {
    SECOND_AS_MS: 1000,
    MINUTE_AS_SEC: 60,
    MINUTE_AS_MS: 60000,
    HOUR_AS_SEC: 3600,
    HOUR_AS_MS: 3600000,
    DAY_AS_SEC: 86400,
  };
  
  export const INTERVAL = {
    SECONDS_1 :    1000,
    SECONDS_5 :    5000,
    SECONDS_10:   10000,
    SECONDS_20:   20000,
    SECONDS_30:   30000,
    MINUTES_1 :   60000,
    MINUTES_15:  900000,
    MINUTES_30: 1800000,
  };
  
  export const TIMEZONE = {
    // Special
    UTC: 'Etc/UCT',
  
    // US specific zones
    EASTERN: 'Us/Eastern',
    CENTRAL: 'US/Central',
    MOUNTAIN: 'US/Mountain',
    PACIFIC: 'US/Pacific',
    HAWAII: 'US/Hawaii',
    ALASKA: 'US/Alaska',
  
    // popular cities
    CHICAGO: 'America/Chicago',
  };
  
  export const TIME_FORMAT = {
    SHORT_TIME: 'h:mm A',
    SHORT_TIME_NOSPACE: 'h:mma',
    LONG_DATE_ABBR: 'ddd MMM D',
    HOUR_ONLY: 'ha',
    DAY_OF_MONTH: 'D',
    DAY_OF_WEEK: 'ddd'
  };