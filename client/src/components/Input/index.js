import React from 'react';
import { InputWrap } from './styles';

const Input = React.forwardRef(({ label, type = 'text', value, onChange, required }, ref) => {
  return (
    <InputWrap>
      {label && <label>{label} {required && <span>*</span>}</label>}
      <input type={type} onChange={e => onChange(e.target.value)} value={value} ref={ref} />
    </InputWrap>
  );
});

Input.defaultProps = {
  onChange: () => { }
};

export default Input;