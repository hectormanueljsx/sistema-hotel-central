import React from 'react';
import { Skeleton } from '@mui/material';

const SleketonLoader = () => {
  return (
    <>
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
      <Skeleton animation='wave' />
    </>
  );
};

export default SleketonLoader;
