import React, { useState } from 'react';
import { Container, Label, Input } from './styles'

function Picker({ label, children, required }) {
  const [open, setOpen] = useState(false);

  function closePopup() {
    setOpen(false);
    document.removeEventListener('click', closePopup);
  }

  function onTogglePicker() {
    setOpen(open => !open);

    !open && document.addEventListener('click', closePopup);
  }

  return (
    <Container>
      {label && <Label>{label} {required && <span>*</span>}</Label>}
      <Input onClick={onTogglePicker}>
        {children({ open })}
      </Input>
    </Container>
  );
}

Picker.propTypes = {
  value: (props, propName) => {
    if (!(props[propName]) instanceof Date) {
      throw new Error('Value should be instance of date');
    }
  }
};

export default Picker;