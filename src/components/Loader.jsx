import React from 'react';
import { Box, CircularProgress, CssBaseline } from '@mui/material';

import { stylesLoaderRender } from '@/components/stylesGlobals';

const Loader = () => {
  return (
    <Box sx={stylesLoaderRender}>
      <CssBaseline />
      <CircularProgress />
    </Box>
  );
};

export default Loader;
