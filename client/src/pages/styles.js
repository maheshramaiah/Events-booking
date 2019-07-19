import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: calc(100% - 750px);
  margin: 0 auto;
  padding: 10px 0;

  @media (max-width: 1600px) {
    width: calc(100% - 400px);
  }
  @media (max-width: 1024px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 768px) {
    width: calc(100% - 50px);
  }
`;