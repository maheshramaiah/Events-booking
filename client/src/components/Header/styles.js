import styled from 'styled-components';

export const HeaderWrap = styled.div`
	position: fixed;
	width: 100%;
	height: 70px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  top: 0;
`;

export const FloatRight = styled.div`
  float: right;
  display: flex;
  align-items: center;
  height: 100%;

  span {
    cursor: pointer;
  }

  .seperator {
    margin: 0 5px;
  }
`;