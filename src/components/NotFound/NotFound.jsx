import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import {
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
      </Box>
    </Container>
  );
};

export default NotFound;
