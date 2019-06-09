import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import history from '../../history';
import { SIGN_IN } from '../../query';
import { LoginWrap, Header, Form, Error } from './styles';

function Signin() {
  const [user, dispatch] = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');

  function onSuccess({ signin }) {
    dispatch({ type: 'login', token: signin });
    history.push('/');
  }

  function onError(err) {
    const errors = err.graphQLErrors.map(e => e.message);

    setLoginErr(errors || err.message);
  }

  return (
    <Mutation
      mutation={SIGN_IN}
      variables={{ email, password }}
      onCompleted={onSuccess}
      onError={onError}
    >
      {
        (signin) => (
          <LoginWrap>
            <Header>
              Login
            </Header>
            <Form>
              <Input
                value={email}
                onChange={value => setEmail(value)}
                label='Email Address'
                type='email'
              />
              <Input
                value={password}
                onChange={value => setPassword(value)}
                label='Password'
                type='password'
              />
              <Button disabled={!email || !password} onClick={signin}>
                Login
              </Button>
              {loginErr && <Error>{loginErr}</Error>}
            </Form>
          </LoginWrap>
        )
      }
    </Mutation>
  );
}

export default Signin;