import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

import {
  stylesButtonHome,
  stylesErrorNumber,
  stylesErrorText,
  stylesSectionContainer,
  stylesSectionText,
} from '@/components/NotFound/NotFoundStyles';

const NotFound = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl' sx={stylesSectionContainer}>
      <Box sx={stylesSectionText}>
        <Typography component='h1' sx={stylesErrorNumber}>
          404
        </Typography>
        <Typography component='h2' sx={stylesErrorText}>
          Página no encontrada
        </Typography>
        <Button variant='contained' color='primary' href='/' sx={stylesButtonHome}>
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
