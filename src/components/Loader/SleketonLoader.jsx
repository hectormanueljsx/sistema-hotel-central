import React from 'react';
import { Skeleton } from '@mui/material';

import { stylesHeightSkeleton } from '@/components/Loader/LoaderStyles';

const SleketonLoader = () => {
  return (
    <>
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
    </>
  );
};

export default SleketonLoader;
