import styled from 'styled-components';

export const ButtonWrap = styled.button`
  color: #fff;
  height: 30px;
  border-radius: 4px;
  background: #3b5998;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`;