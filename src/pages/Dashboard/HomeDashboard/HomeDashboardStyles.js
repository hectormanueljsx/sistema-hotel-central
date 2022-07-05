import { css } from '@emotion/react';

export const stylesBoxHomeDashboard = css`
  display: flex;
  justify-content: center;
  gap: 32px;
`;

export const stylesContainerSection = css`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  padding: 24px;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 0;
  margin-right: 0;
`;

export const stylesGridBox = css`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

export const stylesFlexBox = css`
  flex-direction: column;
`;

export const stylesWidthHeightPaletteColors = css`
  width: 950px;
  height: max-content;
`;

export const stylesTitleAvailable = css`
  color: #ffffff;
  font-weight: 500;
  text-align: center;
`;

export const stylesHeaderAvailable = css`
  background-color: #49afcd;
  height: 50px;
`;

export const stylesHeightBoxColor = css`
  height: 35px;
`;

export const stylesColorOcupado = css`
  background-color: #f40205;
`;

export const stylesColorDisponible = css`
  background-color: #97d987;
`;

export const stylesColorReservado = css`
  background-color: #e69f13;
`;

export const stylesColorOcupadoPorConfirmar = css`
  background-color: #fe6f71;
`;

export const stylesColorReservadoPorConfirmar = css`
  background-color: #f0b94d;
`;

export const stylesColorCheckout = css`
  background-color: #c217cd;
`;

export const stylesColorBloqueado = css`
  background-color: #0501ca;
`;

export const stylesColorBloqueadoConfirmar = css`
  background-color: #2622fe;
`;
