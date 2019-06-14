import React from 'react';
import { InputWrap } from './styles';

const Input = React.forwardRef(({ label, type = 'text', value, onChange, required, placeholder, onEnter }, ref) => {

  function onKeyDown(e) {
    e.keyCode == 13 && onEnter(e.target.value);
  }

  return (
    <InputWrap>
      {label && <label>{label} {required && <span>*</span>}</label>}
      <input
        type={type}
        onChange={e => onChange(e.target.value)}
        value={value}
        ref={ref}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </InputWrap>
  );
});

Input.defaultProps = {
  onChange: () => { },
  onEnter: () => { }
};

export default Input;