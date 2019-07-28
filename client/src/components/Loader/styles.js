import styled from 'styled-components';
import Spinner_svg from '../../assets/Spinner.svg';

export const LoaderWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  background: url(${Spinner_svg});
  background-repeat: no-repeat;
  width: 100px;
  width: 100px;
  height: 100px;
  background-size: 100%;
`;