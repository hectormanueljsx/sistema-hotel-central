import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { loaderStyles } from '@/components/Loader/LoaderStyles';

const Loader = () => {
  return (
    <Box sx={loaderStyles}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
