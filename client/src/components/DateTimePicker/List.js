import React, { useMemo } from 'react';
import { List } from './styles';

function ItemList({ name, items, value, onClick }) {
  function onItemClick(e, value) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onClick(name, value);
  }

  return (
    <List>
      {
        items.map((m, index) => (
          <li key={index} className={m === value ? 'selected' : ''} onClick={(e) => onItemClick(e, m)}>
            {m}
          </li>
        ))
      }
    </List>
  );
}

export default ItemList;