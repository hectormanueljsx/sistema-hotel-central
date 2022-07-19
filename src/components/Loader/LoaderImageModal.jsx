import React from 'react';
import { Box, CardMedia } from '@mui/material';

import Logo from '@/assets/favicon.png';
import { stylesBoxLoaderModal, stylesImageLoader } from '@/components/Loader/LoaderStyles';

const LoaderImageModal = () => {
  return (
    <Box component='div' sx={stylesBoxLoaderModal}>
      <CardMedia component='img' image={Logo} alt='Logo' sx={stylesImageLoader} />
    </Box>
  );
};

export default LoaderImageModal;
