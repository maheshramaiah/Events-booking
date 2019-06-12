import React, { useState, Fragment } from 'react';
import Picker from './Picker';
import DateList from './DateList';

function DatePicker({ label, startYear, endYear, value, onChange, required }) {
  const formattedDate = value.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Picker label={label} value={value} required={required}>
      {
        ({ open }) => (
          <Fragment>
            {formattedDate}
            <DateList
              open={open}
              date={value}
              startYear={startYear}
              endYear={endYear}
              onChange={onChange}
            />
          </Fragment>
        )
      }
    </Picker>
  );
}

const now = new Date();

DatePicker.defaultProps = {
  startYear: now.getFullYear(),
  endYear: now.getFullYear() + 10,
  value: now
};

export default DatePicker;