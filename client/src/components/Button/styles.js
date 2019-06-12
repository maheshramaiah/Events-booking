import styled, { css } from 'styled-components';

function secondary(props) {
  if (props.secondary) {
    return css`
      background: #fff;
      color: #3b5998;
      border: 1px solid #3b5998
    `;
  }
}

export const ButtonWrap = styled.button`
  color: #fff;
  height: 40px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  padding: 0 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 0;
  background: #3b5998;

  ${props => secondary(props)}

  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`;