import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import history from '../../history';
import { SIGN_UP } from '../../query';
import { LoginWrap, Header, Form, Error } from './styles';

function Signup() {
  const [user, dispatch] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');

  function onSuccess({ signup }) {
    dispatch({ type: 'login', token: signup });
    history.push('/');
  }

  function onError(err) {
    const errors = err.graphQLErrors.map(e => e.message);

    setLoginErr(errors || err.message);
  }

  return (
    <Mutation
      mutation={SIGN_UP}
      variables={{ name, email, password }}
      onCompleted={onSuccess}
      onError={onError}
    >
      {
        (signup) => (
          <LoginWrap>
            <Header>
              Sign Up
            </Header>
            <Form>
              <Input
                value={name}
                onChange={value => setName(value)}
                label='Name'
                type='text'
              />
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
              <Button disabled={!name || !email || !password} onClick={signup}>
                Sign up
              </Button>
              {loginErr && <Error>{loginErr}</Error>}
            </Form>
          </LoginWrap>
        )
      }
    </Mutation>
  );
}

export default Signup;