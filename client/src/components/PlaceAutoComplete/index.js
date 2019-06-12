import React, { useEffect, useRef } from 'react';
import Input from '../Input';

function PlaceAutoComplete({ label, onChange }) {
  const inputEl = useRef(null);

  useEffect(() => {
    const autoComplete = new google.maps.places.Autocomplete(inputEl.current);

    autoComplete.setFields(['address_components', 'geometry', 'icon', 'name']);

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      let location = {};

      if (place.geometry) {
        location = {
          address: place.address_components.map(address => address.long_name).join(', '),
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
      }
      else {
        console.warn('Location not found');
        location.address = place.name;
      }

      console.log(location);
      onChange(location);
    });
  }, []);

  return (
    <Input
      label={label}
      ref={inputEl}
    />
  );
}

export default PlaceAutoComplete;