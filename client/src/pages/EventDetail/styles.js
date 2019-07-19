import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  padding: 20px 370px 50px 370px;
  background: #fff;

  @media (max-width: 1600px) {
    padding-left: 200px;
    padding-right: 200px;
   }
  @media (max-width: 1024px) {
    padding-left: 100px;
    padding-right: 100px;
  }
  @media (max-width: 768px) {
    padding-left: 25px;
    padding-right: 25px;
  }
`;

export const HeaderLeft = styled.div`
  flex: 0.7;
`;

export const HeaderRight = styled.div`
  flex: 0.3;
  p {
    margin: 0 0 10px 0;
  }

  button {
    height: 30px;
    margin-right: 10px;
    font-size: 12px;
  }
`;

export const Title = styled.h2`
  margin: 0
`;

export const Author = styled.p`
  margin: 5px 0;
  font-size: 14px;
  
  span {
    color: #00a2c7;
  }
`;

export const Details = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Description = styled.div`
  flex: 0.7;
`;

export const Venue = styled.div`
  flex: 0.3;
`;

export const Address = styled.div`
  padding: 10px;
  background: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
  }
`;

export const MapContainer = styled.div`
  img {
    width: 300px;
    height: 250px;
  }
`;