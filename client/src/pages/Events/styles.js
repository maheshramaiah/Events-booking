import styled from 'styled-components';

export const Banner = styled.div`
  display: flex;
  height: 170px;
  align-items: center;
  justify-content: center;
  background: #00455d;

  h2 {
    color: #fff;
    letter-spacing: 1px;
    margin: 0;
  }
`;

export const Container = styled.div`
	width: calc(100% - 750px);
	margin: 0 auto;
`;

export const Bar = styled.div`
  background: #0f1721;
  padding: 5px 20px;
  min-height: 50px;
  margin-top: -20px;
  position: sticky;
  top: 70px;
`;

export const EventCreate = styled.h4`
  float: right;

  a {
    color: #fff;
    text-decoration: none;
    
    &:hover {
      opacity: 0.9;
    }
  }
`;

export const Page = styled.div`
  padding: 10px 0;
`;

export const EventList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const Name = styled.h3`
  margin: 0;
`;

export const Content = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
  margin: 5px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;