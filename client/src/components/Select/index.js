import React from 'react';
import { SelectWrap } from './styles';

function Select({ label, options, value, onChange, required }) {
  return (
    <SelectWrap>
      {label && <label>{label} {required && <span>*</span>}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option>Select</option>
        {
          options.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))
        }
      </select>
    </SelectWrap>
  );
}

export default Select;