import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { useAuth } from '../../contexts/AuthContext';
import history from '../../history';
import { USER_INFO } from '../../query';
import { HeaderWrap, FloatLeft, FloatRight } from './styles';

function Header() {
  const [user, dispatch] = useAuth();

  function login() {
    history.push('/login');
  }

  function signup() {
    history.push('/signup');
  }

  function logout() {
    dispatch({ type: 'logout' });
    history.push('/');
  }

  function onUserInfoSuccess({ user }) {
    !user && logout();
    dispatch({ type: 'userInfo', user })
  }

  function renderSignButtons() {
    return (
      <Fragment>
        <span onClick={login}>Log in</span>
        <span className="seperator"> | </span>
        <span onClick={signup}>Sign up</span>
      </Fragment>
    );
  }

  function renderProfile() {
    return (
      <Query query={USER_INFO} fetchPolicy={'network-only'} onCompleted={onUserInfoSuccess} onError={logout}>
        {
          ({ loading, error, data }) => (
            <div>
              {!loading && !error && data.user && <span>{data.user.name}</span>}
              <span className="seperator"> | </span>
              <span onClick={logout}>Log out</span>
            </div>
          )
        }
      </Query>
    );
  }

  return (
    <HeaderWrap>
      <FloatLeft onClick={() => history.push('/')}>
        Events
      </FloatLeft>
      <FloatRight>
        {user.isLoggedIn ? renderProfile() : renderSignButtons()}
      </FloatRight>
    </HeaderWrap>
  );
}

export default Header;