import React from 'react';
import { InputWrap } from './styles';

function Input({ label, type = 'text', value, onChange }) {
  return (
    <InputWrap>
      {label && <label>{label} : </label>}
      <input type={type} onChange={e => onChange(e.target.value)} value={value} />
    </InputWrap>
  );
}

export default Input;