import React, { useState } from 'react';
import { Input, Button } from '../../components';
import api from '../../utils/api';
import useAuthSubmit from './useAuthSubmit';
import { PasswordReset, Message } from './styles'

function ResetPassword(props) {
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { disableSubmit } = useAuthSubmit([newPassword, confirmPassword]);

  async function updatePassword() {
    try {
      await api.post(`/api/resetPassword/${props.match.params.id}`, { password: newPassword });
      setMsg('Password resetted');
    }
    catch (err) {
      setMsg(err.err);
    }
  }

  return (
    <PasswordReset>
      <h2>Reset Password</h2>
      <Input
        label='New Password'
        placeholder='New Password'
        type='password'
        value={newPassword}
        onChange={val => setNewPassword(val)}
      />
      <Input
        label='Confirm Password'
        placeholder='Confirm Password'
        type='password'
        value={confirmPassword}
        onChange={val => setConfirmPassword(val)}
      />
      <Button disabled={disableSubmit || (newPassword !== confirmPassword)} onClick={updatePassword}>Update Password</Button>
      {msg && <Message>{msg}</Message>}
    </PasswordReset>
  );
}

export default ResetPassword;