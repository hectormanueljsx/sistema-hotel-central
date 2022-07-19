import React from 'react';
import { Box, CardMedia, Modal } from '@mui/material';

import Logo from '@/assets/favicon.png';
import { stylesBoxLoader, stylesImageLoader } from '@/components/Loader/LoaderStyles';

const LoaderImage = () => {
  return (
    <Modal open={true}>
      <Box component='div' sx={stylesBoxLoader}>
        <CardMedia component='img' image={Logo} alt='Logo' sx={stylesImageLoader} />
      </Box>
    </Modal>
  );
};

export default LoaderImage;
