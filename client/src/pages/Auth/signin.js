import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button } from '../../components';
import { SIGN_IN } from '../../query';
import useAuthSubmit from './useAuthSubmit';
import { LoginWrap, Header, Form, Error } from './styles';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { disableSubmit, err, onSuccess, onError } = useAuthSubmit([email, password]);

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
              <Button disabled={disableSubmit} onClick={signin}>
                Login
              </Button>
              {err && <Error>{err}</Error>}
            </Form>
          </LoginWrap>
        )
      }
    </Mutation>
  );
}

export default Signin;