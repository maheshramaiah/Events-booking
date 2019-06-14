import React from 'react';
import { LoaderWrap, Spinner } from './styles';

function Loader() {
  return (
    <LoaderWrap>
      <Spinner />
    </LoaderWrap>
  );
}

export default Loader;