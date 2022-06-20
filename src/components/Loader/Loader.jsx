import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { stylesCircle, stylesLoader } from '@/components/Loader/LoaderStyles';

const Loader = () => {
  return (
    <Box sx={stylesLoader}>
      <CircularProgress sx={stylesCircle} />
    </Box>
  );
};

export default Loader;
