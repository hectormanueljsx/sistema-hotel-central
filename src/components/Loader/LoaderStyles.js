import { css, keyframes } from '@emotion/react';

export const stylesBoxLoader = css`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  z-index: 3000;
`;

const animationImage = keyframes`
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
`;

export const stylesImageLoader = css`
  width: 150px;
  height: 150px;
  animation: ${animationImage} 2s infinite;
`;

export const stylesSkeleton = css`
  height: 34px;
`;
