import { css } from '@emotion/react';

export const stylesWrapperGeneral = css`
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 1432px;
  height: max-content;
  margin: 32px auto 0 auto;
`;

export const stylesWrapperBoxShadow = css`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  padding: 16px;
`;

export const stylesWidthHeightTabs = css`
  width: 1432px;
  height: max-content;
`;

export const stylesTabs = css`
  background-color: #321728;
  color: #ffffff;
  border-radius: 4px;
`;

export const stylesCenteredTabs = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const stylesRemovePaddingTab = css`
  padding: 0 16px;
`;
