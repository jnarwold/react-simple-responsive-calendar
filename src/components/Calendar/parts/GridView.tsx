import { IconTypes } from '../../../types';
import { DAY, WEEK, TIME_FORMAT } from '../../../constants';
import { getNumberOfDaysBetweenMoments } from '../../../utils/date';
import { guid } from '../../../utils/guid';
import * as classnames from 'classnames';
import { orderBy } from 'lodash';
import * as moment from 'moment';
import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import { ICalendarEvent, IViewProps } from '../Calendar.d';
import * as classes from '../Calendar.scss';
import { getDateEvents } from '../utils';
import { EventCard } from './EventCard';

class GridViewBase extends React.Component<IViewProps> {

  numberOfDaysInDateRange = () => getNumberOfDaysBetweenMoments(
    this.props.dateRangeStart,
    this.props.dateRangeEnd
  )

  renderShowMoreMenu = (events: ICalendarEvent[]) => {
    if (events.length <= 0)
      return null;

    const props = {
      className: classes.showMoreButton,
    };

    return (
        <div {...props}>
          <FontAwesome name={IconTypes.Ellipsis_H} />
        </div>
    );
  }

  renderEventCard = (event: ICalendarEvent) => {
    const props = {
      event,
      showStartTime: true,
      key: guid()
    };

    return (<EventCard {...props}/>);
  }

  renderEventCards = (mDate: moment.Moment) => {
    const dateEvents = getDateEvents(mDate.toDate(), this.props.calendarEvents);
    const sortedEvents = orderBy(dateEvents, 'start');
    const eventCards = sortedEvents.splice(0, 2).map(this.renderEventCard);

    return (
      <div className={classes.eventWrapper}>
        { eventCards }
        { this.renderShowMoreMenu(sortedEvents) }
      </div>
    ); 
  }

  renderDayOfWeekLabel = (index: number, mDate: moment.Moment) => {
    const props = {
      key: `dayOfWeek-${index}`,
      className: classnames(
        classes.dayBlock,
        classes.dayOfWeekLabel
      )
    };

    return (
      <div {...props}>
        { mDate.format(TIME_FORMAT.DAY_OF_WEEK) }
      </div>
    );
  }

  renderDayContent = (index: number, mDate: moment.Moment) => {
    const props = {
      key: index,
      className: classes.dayBlock
    };
    const dayLabel = mDate.format(TIME_FORMAT.DAY_OF_MONTH);

    return (
      <div {...props}>
        { dayLabel }
        { this.renderEventCards(mDate) }
      </div>
    );
  }

  renderGridDays = () => {
    const numberOfDays = this.numberOfDaysInDateRange();
    const gridBlocks = [];

    for (let i = 0; i < 7; i++) {
      const day = moment().startOf(WEEK).add(i, DAY);

      gridBlocks.push(this.renderDayOfWeekLabel(i * i, day));
    }

    for (let i = 0; i <= numberOfDays; i++) {
      const day = moment(this.props.dateRangeStart)
        .add(i, DAY);

      gridBlocks.push(this.renderDayContent(i, day));
    }

    return gridBlocks;
  }

  renderGridView = () => {
    return (
      <div className={classes.gridView}>
        {this.renderGridDays()}
      </div>
    );
  }

  renderShowMoreDrawer = () => {
    const { showMoreDrawer } = this.state;

    const props = {
      status: showMoreDrawer.status,
      closeLabel: this.props.labels.hideShowMoreDrawer,
      content: showMoreDrawer.content,
      location: DrawerLocationTypes.Right,
      onStatusChange: this.onShowMoreDrawerStatusChange
    };

    return (<Drawer {...props}/>);
  }

  render() {
    return (
      <React.Fragment>
        { this.renderGridView() }
        { this.renderShowMoreDrawer() }
      </React.Fragment>
    );
  }
}

export const GridView = GridViewBase;