import React from 'react';
import { Box } from '@mui/material';

import FormIntercambiarReservacion from '@/pages/Reservas/IntercambiarReservacion/FormIntercambiarReservacion';
import { stylesWrapperGeneral } from '@/pages/Reservas/IntercambiarReservacion/IntercambiarReservacionStyle';

const IntercambiarReservacion = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormIntercambiarReservacion />
    </Box>
  );
};

export default IntercambiarReservacion;
