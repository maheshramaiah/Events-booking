import React from 'react';

function StaticMap({ lat, lng }) {
  return (
    <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`}>
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?size=400x400&maptype=roadmap&markers=color:blue%7C${lat},${lng}&key=AIzaSyDvKuXx70QSatz1Ap0EIjAWmUJFvL7YbtU`}
      >
      </img>
    </a>

  );
}

export default StaticMap;
