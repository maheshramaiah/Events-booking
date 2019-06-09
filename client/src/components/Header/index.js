import React from 'react';
import { Query } from 'react-apollo';
import { useAuth } from '../../contexts/AuthContext';
import history from '../../history';
import { USER_INFO } from '../../query';
import { HeaderWrap, FloatRight } from './styles';

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

  function renderSignButtons() {
    return (
      <React.Fragment>
        <span onClick={login}>Log in</span>
        <span className="seperator"> | </span>
        <span onClick={signup}>Sign up</span>
      </React.Fragment>
    );
  }

  function renderProfile() {
    return (
      <Query query={USER_INFO}>
        {
          ({ loading, error, data }) => (
            <div>
              {!loading && !error && data && <span>{data.user.name}</span>}
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
      <FloatRight>
        {user.isLoggedIn ? renderProfile() : renderSignButtons()}
      </FloatRight>
    </HeaderWrap>
  );
}

export default Header;