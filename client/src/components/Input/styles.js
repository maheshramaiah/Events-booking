import styled from 'styled-components';

export const InputWrap = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0
  }
  
  label {
    font-size: 14px;
    margin-bottom: 10px;
    display: inline-block;
  }
  input {
    font-size: 14px;
    display: block;
    width: 100%;
    height: 40px;
    padding: 5px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }
`;