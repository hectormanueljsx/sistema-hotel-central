import { css } from '@emotion/react';

export const stylesWrapperGeneral = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 32px;
  width: 1432px;
  height: max-content;
  margin: 32px auto;
`;

export const stylesWrapperBoxShadow = css`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  padding: 16px;
`;

export const stylesWidthHeightForm = css`
  width: 1114px;
  height: max-content;
`;

export const stylesGridWrapperForm = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const stylesGridWrapperButtons = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
`;

export const stylesButtonSend = css`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;
