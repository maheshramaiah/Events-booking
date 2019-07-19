import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import history from './history';
import AuthProvider from './contexts/AuthContext';
import Header from './components/Header';
import Signin from './pages/Auth/signin';
import Signup from './pages/Auth/signup';
import ForgotPassword from './pages/Auth/forgotPassword';
import ResetPassword from './pages/Auth/resetPassword';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import './styles.scss';

const client = new ApolloClient({
  uri: '/graphql',
  request(operation) {
    const token = localStorage.getItem('token');

    operation.setContext({
      headers: {
        Authorization: token ? `bearer ${token}` : ''
      }
    })
  }
});

const Body = styled.div`
  padding-top: 70px;
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router history={history}>
          <Header />
          <Body>
            <Switch>
              <Route exact path='/' render={() => <Redirect to={{ pathname: '/events' }} />} />
              <Route path='/events' component={Events} />
              <Route path='/event/:id' component={EventDetail} />
              <Route path='/createEvent' component={CreateEvent} />
              <Route path='/login' component={Signin} />
              <Route path='/signup' component={Signup} />
              <Route path='/forgotPassword' component={ForgotPassword} />
              <Route path='/resetPassword/:id' component={ResetPassword} />
            </Switch>
          </Body>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;