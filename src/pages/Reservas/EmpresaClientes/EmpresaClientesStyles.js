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

export const stylesWidthHeightTable = css`
  width: 1018px;
  height: max-content;
`;

export const stylesTableCellHeader = css`
  padding: 8px 4px;
  border-bottom: 2px solid #dee2e6;
`;

export const stylesTableCellBody = css`
  padding: 9px 4px;
  border-bottom: 1.5px solid #dee2e6;
`;
