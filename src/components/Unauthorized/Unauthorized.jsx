import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

import SvgLock from '@/components/Unauthorized/SvgLock';
import {
  stylesBoxLock,
  stylesButtonHome,
  stylesErrorText,
  stylesSectionContainer,
  stylesSectionText,
} from '@/components/Unauthorized/UnauthorizedStyles';

const Unauthorized = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl' sx={stylesSectionContainer}>
      <Box sx={stylesSectionText}>
        <Box sx={stylesBoxLock}>
          <SvgLock />
        </Box>
        <Typography component='h2' sx={stylesErrorText}>
          No tienes permisos para acceder a esta página
        </Typography>
        <Button variant='contained' color='primary' href='/' sx={stylesButtonHome}>
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
