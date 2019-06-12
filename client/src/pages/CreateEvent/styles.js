import styled from 'styled-components';

export const Container = styled.div`
  width: calc(100% - 750px);
  margin: 0 auto;
  padding: 10px 0;
`;

export const DateTime = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ButtonWrap = styled.div`
  padding-top: 20px;
  
  button {
    margin-right: 20px;
  }
`;

export const Error = styled.span`
  font-size: 12px;
  color: red;
`;