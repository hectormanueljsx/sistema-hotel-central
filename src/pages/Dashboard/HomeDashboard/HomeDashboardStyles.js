import { css } from '@emotion/react';

export const stylesWrapperGeneral = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 1432px;
  height: max-content;
  margin: 32px auto;
`;

export const stylesWrapperInternal = css`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

export const stylesWrapperBoxShadow = css`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  padding: 16px;
`;

export const stylesWidthHeightPaletteColors = css`
  width: 950px;
  height: max-content;
`;

export const stylesGridWrapperPaletteColors = css`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 50px 35px;
`;

export const stylesBackgroundHeaderAvailable = css`
  background-color: #49afcd;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const stylesTextTitleAvailable = css`
  color: #ffffff;
  font-weight: 500;
  text-align: center;
`;

export const stylesWidthHeightColor = css`
  width: 100%;
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
