
import { useState } from 'react';
import history from '../../history';
import { useAuth } from '../../contexts/AuthContext';

function useAuthSubmit(formState = []) {
  const [_, dispatch] = useAuth();
  const [err, setErr] = useState('');
  const disableSubmit = formState.some(state => !state);

  function onSuccess({ signin }) {
    dispatch({ type: 'login', token: signin });
    history.push('/');
  }

  function onError(err) {
    const errors = err.graphQLErrors.map(e => e.message);

    setErr(errors || err.message);
  }

  return {
    disableSubmit,
    err,
    onSuccess,
    onError
  };
}

export default useAuthSubmit;