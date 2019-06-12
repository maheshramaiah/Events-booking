import React from 'react';
import List from './List';
import { hours, minutes } from './utils';
import { Popup } from './styles';

function TimeList({ open, date, onChange }) {
  const timeObj = {
    hours: date.getHours(),
    minutes: date.getMinutes()
  };

  function onClick(key, value) {
    const newDate = new Date(date);

    timeObj[key] = value;
    onChange(new Date(newDate.setHours(timeObj.hours, timeObj.minutes)));
  }

  return (
    <Popup open={open}>
      <List name='hours' items={hours} value={timeObj.hours} onClick={onClick} />
      <List name='minutes' items={minutes} value={timeObj.minutes} onClick={onClick} />
    </Popup>
  );
}

export default TimeList;