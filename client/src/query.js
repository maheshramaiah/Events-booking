import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`;

export const SIGN_UP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  } 
`;

export const USER_INFO = gql`
  query {
    user {
      id,
      name,
      email
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($eventInput: EventInput) {
    createEvent(eventInput: $eventInput) {
      id,
      name,
      description,
      startDate,
      endDate,
      location {
        address,
        lat,
        lng
      },
      participants,
      creator {
        id,
        email,
        name
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query {
    events {
      id,
      name,
      description,
      startDate,
      location {
        address
      },
      participants
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id,
      name,
      description,
      startDate,
      endDate,
      location {
        address,
        lat,
        lng
      },
      participants,
      creator {
        id,
        email,
        name
      }
    }
  }
`;

export const ADD_PARTICIPANT = gql`
  mutation AddParticipant($id: ID!, $userId: ID!, $isAttending: Boolean) {
    addParticipant(id: $id, userId: $userId, isAttending: $isAttending)
  }
`;