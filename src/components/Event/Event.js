import React, { PureComponent } from 'react';
import './Event.css';

const VALUE_STATUS = [
  'default',
  'online'
];

class Event extends PureComponent {
  render() {
    const { timeEnd, timeStart, info, delay, status } = this.props;
    const delayStyle = {
      animation: `${VALUE_STATUS.includes(status) ? 'fade-in' : 'fade-in2' } .5s forwards`,
      animationDelay: `${delay*150}ms`
    }
    return (
      <div className={`event-block App--margin event-block--${status}`} style={delayStyle}>
        <div className="event-block__time">{`${timeStart} - ${timeEnd}`}</div>
        <div className="event-block__item">
        <h2 className="event-block__title">{info.title}</h2>
          <div className="event-block__description">{info.description}</div>
        </div>
      </div>
    )
  };
}

export default Event;