import { TIME_FORMAT } from '../../../constants';
import * as moment from 'moment';
import * as React from 'react';
import { IEventCardProps } from '../Calendar.d';
import * as classes from '../Calendar.scss';
//import * as classnames from 'classnames';

class EventCardBase extends React.Component<IEventCardProps> {
  renderStartTime = () => {
    const { showStartTime, event } = this.props;

    if (!showStartTime)
      return null;

    const startTime = moment(event.start).format(TIME_FORMAT.HOUR_ONLY);

    return (
      <div>{startTime}</div>
    );
  }

  renderTitle = () => {
    return (
      <div className={classes.title}>
        {this.props.event.title}
      </div>
    );
  }

  renderOpenings = () => {
    return (
      <div className={classes.openings}>
        {this.props.event.openings}
      </div>
    );
  }

  renderContent = () => {
    const props = { 
      style: this.props.style, 
      className: classes.content
    };

    return (
      <div {...props}>
        { this.renderStartTime() }
        { this.renderTitle() }
        { this.renderOpenings() }
      </div>
    );
  }

  render() {
    const { 
      style, 
      event: { onClick } 
    } = this.props;

    const cardProps = {
      onClick,
      className: classes.eventCard
    };
    const borderProps = {
      style,
      className: classes.minuteBorder
    };

    return (
      <div {...cardProps}>
        <div {...borderProps}></div>
        { this.renderContent() }
      </div>
    );
  }
}

export const EventCard = EventCardBase;