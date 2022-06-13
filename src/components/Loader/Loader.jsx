import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { stylesLoader } from '@/components/Loader/LoaderStyles';

const Loader = () => {
  return (
    <Box sx={stylesLoader}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
