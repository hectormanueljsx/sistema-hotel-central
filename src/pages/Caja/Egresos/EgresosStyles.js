import { css } from '@emotion/react';

export const stylesWrapperGeneral = css`
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 1432px;
  height: max-content;
  margin: 32px auto;
`;

export const stylesWrapperInternal = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
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

export const stylesCheckboxForm = css`
  padding: 0;
  padding-left: 9px;
`;

export const stylesButtonSend = css`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

export const stylesWidthHeightTable = css`
  width: 1018px;
  height: max-content;
`;

export const stylesTableCellHeader = css`
  padding: 8px 4px;
  border-bottom: 2px solid #dee2e6;
`;

export const stylesTableCellBody = css`
  padding: 2px 4px;
  border-bottom: 1.5px solid #dee2e6;
`;

export const stylesSuperpositionModal = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const stylesWidthHeightModal = css`
  width: 748px;
  height: max-content;
`;

export const stylesGridWrapperModal = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const stylesGridWrapperButtons = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 32px;
`;

export const stylesWidthAutoButtons = css`
  width: max-content;
`;

export const stylesButtonAlignEnd = css`
  display: flex;
  justify-content: flex-end;
`;

export const stylesButtonCloseModal = css`
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
