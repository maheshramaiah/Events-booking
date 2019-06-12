import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 10px 10px 0;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
  display: inline-block;
`;

export const Input = styled.div`
	display: flex;
  align-items: center;
	width: 190px;
	border: 1px solid rgba(0, 0, 0, 0.12);
	height: 40px;
	padding: 5px;
	box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
`;

export const Popup = styled.div`
  position: absolute;
  width: 100%;
  height: 285px;
  left: 0;
  top: 45px;
  background: rgba(2,66,89, 1);
  overflow: hidden;
  border-radius: 4px;
  z-index: 1;

  display: ${props => props.open ? 'flex' : 'none'}
`;

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: rgba(255, 255, 255, 0.9);
  overflow: auto;
  border-right: 1px solid #000;
  flex: 1;

  &:last-child {
    border-right: none;
  }

  li {
    padding: 10px 20px;
    font-size: 12px;

    &.selected {
      color: #049fd9;
    }
  }
`;