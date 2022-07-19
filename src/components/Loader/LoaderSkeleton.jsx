import React from 'react';
import { Box, Skeleton } from '@mui/material';

import { stylesSkeleton } from '@/components/Loader/LoaderStyles';

const LoaderSkeleton = () => {
  return (
    <Box component='div'>
      <Skeleton animation='wave' sx={stylesSkeleton} />
      <Skeleton animation='wave' sx={stylesSkeleton} />
      <Skeleton animation='wave' sx={stylesSkeleton} />
      <Skeleton animation='wave' sx={stylesSkeleton} />
      <Skeleton animation='wave' sx={stylesSkeleton} />
    </Box>
  );
};

export default LoaderSkeleton;
