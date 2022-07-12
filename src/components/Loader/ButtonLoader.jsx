import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { stylesButtonSend, stylesCircularProgress } from '@/components/Loader/LoaderStyles';

const ButtonLoader = () => {
  return (
    <Box component='div' sx={stylesButtonSend}>
      <CircularProgress sx={stylesCircularProgress} size={42.25} variant='indeterminate' />
    </Box>
  );
};

export default ButtonLoader;
