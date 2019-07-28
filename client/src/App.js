import React, { Suspense, lazy } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import history from './history';
import AuthProvider from './contexts/AuthContext';
import { Loader } from './components';
import Header from './components/Header';
import './styles.scss';

const Signin = lazy(() => import('./pages/Auth/signin'));
const Signup = lazy(() => import('./pages/Auth/signup'));
const ForgotPassword = lazy(() => import('./pages/Auth/forgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/resetPassword'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const CreateEvent = lazy(() => import('./pages/CreateEvent'));

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
            <Suspense fallback={<Loader />}>
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
            </Suspense>
          </Body>
        </Router>
      </AuthProvider>
    </ApolloProvider >
  );
}

export default App;