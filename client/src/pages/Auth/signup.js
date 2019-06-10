import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button } from '../../components';
import { SIGN_UP } from '../../query';
import useAuthSubmit from './useAuthSubmit';
import { LoginWrap, Header, Form, Error } from './styles';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { disableSubmit, err, onSuccess, onError } = useAuthSubmit([name, email, password]);

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
              <Button disabled={disableSubmit} onClick={signup}>
                Sign up
              </Button>
              {err && <Error>{err}</Error>}
            </Form>
          </LoginWrap>
        )
      }
    </Mutation>
  );
}

export default Signup;