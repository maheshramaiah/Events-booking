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