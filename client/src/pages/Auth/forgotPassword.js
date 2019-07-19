import React, { useState } from 'react';
import { Input, Button } from '../../components';
import api from '../../utils/api';
import useAuthSubmit from './useAuthSubmit';
import {PasswordReset, Message} from './styles'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const { disableSubmit } = useAuthSubmit([email]);

  async function sendEmail() {
    try {
      await api.post('/api/forgotPassword', { email });
      setMsg(`An email has been sent with further instructions`);
    }
    catch (err) {
      setMsg(err.err);
    }
  }

  return (
    <PasswordReset>
      <h2>Forgot Password</h2>
      <Input
        label='Email'
        placeholder='Enter email to reset password'
        value={email}
        onChange={val => setEmail(val)}
      />
      <Button disabled={disableSubmit} onClick={sendEmail}>Send</Button>
      {msg && <Message>{msg}</Message>}
    </PasswordReset>
  );
}

export default ForgotPassword;