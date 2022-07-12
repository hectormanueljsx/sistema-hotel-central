import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import {
  stylesButtonHome,
  stylesErrorNumber,
  stylesErrorText,
  stylesWrapperGeneral,
  stylesSectionText,
} from '@/components/NotFound/NotFoundStyles';

const NotFound = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <Box component='div' sx={stylesSectionText}>
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
    </Box>
  );
};

export default NotFound;
