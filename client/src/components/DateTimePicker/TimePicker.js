import React, { useState, Fragment } from 'react';
import Picker from './Picker';
import TimeList from './TimeList';

function TimePicker({ label, value, onChange, required }) {
  const formattedTime = value.toLocaleTimeString('en', { hour: 'numeric', minute: 'numeric' })

  return (
    <Picker label={label} value={value} required={required}>
      {
        ({ open }) => (
          <Fragment>
            {formattedTime}
            <TimeList
              open={open}
              date={value}
              onChange={onChange}
            />
          </Fragment>
        )
      }
    </Picker>
  );
}

TimePicker.defaultProps = {
  value: new Date()
};

export default TimePicker;