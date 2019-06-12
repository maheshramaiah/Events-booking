import styled from 'styled-components';

export const LoginWrap = styled.div`
  width: 460px;
  margin 50px auto 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.12)
`;

export const Header = styled.h4`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  text-align: center;
  margin: 0;
  padding: 15px 0;
  text-transform: uppercase;
`;

export const Form = styled.div`
  padding: 15px;
  box-sizing: 'border-box';

  button {
    margin-top: 10px;
  }
`;

export const Error = styled.span`
  font-size: 12px;
  margin-left: 10px;
  color: red;
`;