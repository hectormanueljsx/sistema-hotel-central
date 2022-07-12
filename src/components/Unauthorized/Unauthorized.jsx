import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import SvgLock from '@/components/Unauthorized/SvgLock';
import {
  stylesBoxLock,
  stylesButtonHome,
  stylesErrorText,
  stylesWrapperGeneral,
  stylesSectionText,
} from '@/components/Unauthorized/UnauthorizedStyles';

const Unauthorized = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <Box component='div' sx={stylesSectionText}>
        <Box component='div' sx={stylesBoxLock}>
          <SvgLock />
        </Box>
        <Typography component='h2' sx={stylesErrorText}>
          No tienes permisos para acceder a esta página
        </Typography>
        <Button variant='contained' color='primary' href='/' sx={stylesButtonHome}>
          Volver al inicio
        </Button>
      </Box>
    </Box>
  );
};

export default Unauthorized;
