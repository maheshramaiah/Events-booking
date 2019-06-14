import React from 'react';
import Select from '../Select';
import data from './data';

function MockPlace({ label, onChange }) {
  function onPlaceChange(id) {
    let location = null;
    const place = data.find(d => d.id === +id);

    if (place) {
      location = {
        address: place.address_components.map(d => d.long_name).join(', '),
        lat: +place.geometry.location.lat.toFixed(4),
        lng: +place.geometry.location.lng.toFixed(4)
      };
    }

    onChange(location);
  }

  return (
    <Select
      label={label}
      options={data}
      onChange={onPlaceChange}
      required={true}
    />
  );
}

export default MockPlace;