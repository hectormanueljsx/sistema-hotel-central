import { css } from '@emotion/react';

export const stylesWrapperGeneral = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 80px);
`;

export const stylesWrapperBoxShadow = css`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  padding: 16px;
`;

export const stylesWidthHeightForm = css`
  width: 382px;
  height: max-content;
`;

export const stylesGridWrapperForm = css`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
`;

export const stylesBoxImage = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const stylesIconImage = css`
  height: 70px;
  width: 70px;
  margin-bottom: 16px;
`;

export const stylesButtonSend = css`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;
