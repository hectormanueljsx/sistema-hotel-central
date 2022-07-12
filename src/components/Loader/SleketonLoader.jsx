import React from 'react';
import { Box, Skeleton } from '@mui/material';

import { stylesHeightSkeleton } from '@/components/Loader/LoaderStyles';

const SleketonLoader = () => {
  return (
    <Box component='div'>
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
      <Skeleton animation='wave' sx={stylesHeightSkeleton} />
    </Box>
  );
};

export default SleketonLoader;
