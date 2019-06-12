import React from 'react';
import { ButtonWrap } from './styles';

function Button({ onClick, disabled = false, children, secondary }) {
  return (
    <ButtonWrap onClick={onClick} disabled={disabled} secondary={secondary}>
      {children}
    </ButtonWrap>
  );
}

export default Button;