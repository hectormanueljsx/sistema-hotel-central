import React from 'react';
import { Box, CircularProgress, CssBaseline } from '@mui/material';

import { stylesLoaderAlertRender } from '@/components/stylesGlobals';

const Loader = () => {
  return (
    <Box sx={stylesLoaderAlertRender}>
      <CssBaseline />
      <CircularProgress />
    </Box>
  );
};

export default Loader;
