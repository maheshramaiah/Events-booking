import React, { useMemo } from 'react';
import List from './List';
import { shortMonths, getYearsFromRange, getDays, getDaysInMonth } from './utils';
import { Popup } from './styles';

function DateList({ open, date, startYear, endYear, onChange }) {
  const dateObj = {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
  const years = useMemo(() => getYearsFromRange(startYear, endYear), [startYear, endYear]);
  const days = useMemo(() => getDays(dateObj.year, dateObj.month), [dateObj.year, dateObj.month]);

  function onClick(key, value) {
    const newDate = new Date(date);

    if (key === 'month') {
      dateObj.month = shortMonths.findIndex(m => m === value);
      const noOfDays = getDaysInMonth(dateObj.year, dateObj.month);

      if (dateObj.date > noOfDays) {
        dateObj.date = noOfDays;
      }
    }
    else {
      dateObj[key] = value;
    }

    newDate.setDate(dateObj.date);
    newDate.setMonth(dateObj.month);
    newDate.setFullYear(dateObj.year);

    onChange(newDate);
  }

  return (
    <Popup open={open}>
      <List name='month' items={shortMonths} value={shortMonths[dateObj.month]} onClick={onClick} />
      <List name='date' items={days} value={dateObj.date} onClick={onClick} />
      <List name='year' items={years} value={dateObj.year} onClick={onClick} />
    </Popup>
  );
}

export default DateList;