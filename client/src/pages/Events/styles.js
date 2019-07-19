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

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  background: #0f1721;
  padding: 5px 20px;
  min-height: 50px;
  margin-top: -40px;
  position: sticky;
  top: 70px;

  input {
    background: #fff;
  }

  &>div {
    flex: 0.5;

    @media (max-width: 768px) {
      flex: 0.8;
    }
  }
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
  display: flex;
`;

export const EventList = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1

  li {
    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const Event = styled.div`
  display: flex;
`;

export const EventTime = styled.div`
  flex: 0.2;
  max-width: 120px;

  p {
    white-space: pre-wrap;
  }
`;

export const EventDetail = styled.div`
  flex: 1;
  padding: 0 20px;

  h3 {
    margin: 0;
  }
`;

export const Content = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
  margin: 5px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const TabList = styled.ul`
  padding: 0;
  margin-left: 20px;
  list-style-type: none;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 100%;
  border-radius: 4px;
  position: sticky;
  top: 160px;

  li {
    padding: 10px;
    font-size: 14px;
    letter-spacing: 0.5px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    box-sizing: border-box;

    &:last-child {
      border-bottom: 0;
    }

    &.selected {
      color: #1f24cc;
      border-left: 4px solid #1f24cc;
    }
  }
`;