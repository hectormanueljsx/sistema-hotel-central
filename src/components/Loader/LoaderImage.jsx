import React from 'react';
import { Box, CardMedia } from '@mui/material';

import Logo from '@/assets/favicon.png';
import { stylesBoxLoader, stylesImageLoader } from '@/components/Loader/LoaderStyles';

const LoaderImage = () => {
  return (
    <Box component='div' sx={stylesBoxLoader}>
      <CardMedia component='img' image={Logo} alt='Logo' sx={stylesImageLoader} />
    </Box>
  );
};

export default LoaderImage;
