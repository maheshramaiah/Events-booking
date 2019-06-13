import styled from 'styled-components';

export const SelectWrap = styled.div`
  padding: 10px 0;
  
  label {
    font-size: 14px;
    margin-bottom: 10px;
    display: inline-block;
  }
  select {
    height: 40px;
    background: #fff;
    font-size: 14px;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 4px;
    width: 100%;
    background: transparent;

    &:focus {
      outline: none;
    }
  }
`;