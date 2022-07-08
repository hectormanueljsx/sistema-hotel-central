import { css } from '@emotion/react';

export const stylesBoxUsuarios = css`
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

export const stylesWidthHeightForm = css`
  width: 400px;
  height: max-content;
`;

export const stylesBoxCheckboxs = css`
  display: flex;
  flex-wrap: wrap;
`;

export const stylesCheckboxFlex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin-left: 0;
`;

export const stylesMarginTopCheckbox = css`
  margin-top: 8px;
`;

export const stylesCheckboxForm = css`
  padding: 0 4px 0 0;
`;

export const stylesWidthHeightTable = css`
  width: 1000px;
  height: max-content;
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

export const stylesButtonSend = css`
  margin-top: 16px;
`;

export const stylesTableCellHeader = css`
  padding: 8px 4px;
  border-bottom: 2px solid #dee2e6;
`;

export const stylesTableCellBody = css`
  padding: 2px 4px;
  border-bottom: 1.5px solid #dee2e6;
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

export const stylesContainerBoxButtonAlign = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const stylesBoxButtons = css`
  display: flex;
  justify-content: center;
  gap: 28px;
`;
