import { css } from '@emotion/react';

export const stylesBoxFallas = css`
  display: flex;
  justify-content: center;
  gap: 32px;
`;

export const stylesContainerSection = css`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  padding: 24px;
  margin-top: 48px;
  margin-bottom: 48px;
  margin-left: 0;
  margin-right: 0;
`;

export const stylesWidthHeightForm = css`
  width: 400px;
  height: max-content;
`;

export const stylesWidthHeightTable = css`
  width: 1000px;
  height: max-content;
`;

export const stylesDateTable = css`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
`;

export const stylesWidthHeightModal = css`
  margin-top: 0;
  margin-bottom: 0;
  width: 780px;
  height: max-content;
`;

export const stylesContainerBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const stylesContainerInput = css`
  width: 100%;
  margin-bottom: 16px;
`;

export const stylesTableCell = css`
  padding: 8px;
`;

export const stylesModal = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const stylesModalClose = css`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0;
  border-top-right-radius: 4px;

  &:hover {
    background-color: #d32f2f;
    color: #ffffff;
  }
`;

export const stylesBoxModal = css`
  display: flex;
  flex-direction: column;
`;

export const stylesBoxInputs = css`
  display: flex;
  justify-content: space-between;
`;

export const stylesWidthInput = css`
  width: 352px;
`;

export const stylesWidthButton = css`
  width: max-content;
`;

export const stylesBoxButtons = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;
