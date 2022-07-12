import { css } from '@emotion/react';

export const stylesWrapperGeneral = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
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

export const stylesWrapperBoxForms = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 32px;
  width: 100%;
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

export const stylesTextTitleForm = css`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
`;

export const stylesBoxIconArrow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 16px;
`;

export const stylesArrowRight = css`
  color: #d32f2f;
  font-size: 50px;
`;

export const stylesArrowLeft = css`
  color: #388e3c;
  font-size: 50px;
`;

export const stylesButtonSend = css`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;
