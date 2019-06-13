import styled from 'styled-components';

export const InputWrap = styled.div`
  padding: 10px 0;
  
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
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: transparent;

    &:focus {
      outline: none;
    }
  }
`;