import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
  uri: '/graphql',
  request(operation) {
    operation.setContext({
      headers: {
        Authorization: 'bearer abcd'
      }
    })
  }
});

const events = gql`
  query {
    events {
      id,
      name,
      description,
      date,
      coordinates,
      creator,
      participants
    }
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Query query={events}>
        {
          ({ loading, error, data }) => {
            if (loading) return <div>Loading ...</div>
            if (error) return <div>Error</div>

            console.log(data);
            return null;
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;