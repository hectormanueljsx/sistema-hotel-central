import { css } from '@emotion/react';

export const stylesBoxEmpresa = css`
  display: flex;
  gap: 32px;
  justify-content: center;
`;

export const stylesBoxSearchTable = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const stylesContainerDoubleForm = css`
  display: flex;
  flex-direction: column;
  margin-left: 0;
  margin-right: 0;
  width: 400px;
`;

export const stylesContainerBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const stylesContainerBoxFormSearch = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
`;

export const stylesContainerInputSearch = css`
  width: 100%;
  margin-bottom: 0;
`;

export const stylesContainerInput = css`
  width: 100%;
  margin-bottom: 16px;
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

export const stylesContainerNoMargin = css`
  margin-bottom: 0;
`;

export const stylesContainerNoMarginTop = css`
  margin-top: 0;
`;

export const stylesWidthHeightForm = css`
  width: 400px;
  height: max-content;
`;

export const stylesWidthHeightSearchForm = css`
  width: 1000px;
  height: max-content;
`;

export const stylesBoxForm = css`
  display: flex;
  flex-direction: column;
`;

export const stylesButtonSend = css`
  margin-top: 16px;
`;

export const stylesButtonSearch = css`
  width: max-content;
`;

export const stylesBoxButtonForm = css`
  display: flex;
  justify-content: center;
`;

export const stylesBoxButtons = css`
  display: flex;
  justify-content: center;
  gap: 28px;
`;

export const stylesTableCell = css`
  padding: 8px;
`;

export const stylesWidthHeightTable = css`
  width: 1000px;
  height: max-content;
`;

export const stylesModal = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

export const stylesWidthHeightModal = css`
  margin-top: 0;
  margin-bottom: 0;
  width: 780px;
  height: max-content;
`;
