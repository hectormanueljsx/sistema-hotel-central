import React from 'react';
import { Box } from '@mui/material';

import FormReservacion from '@/pages/Dashboard/Reservacion/FormReservacion';
import { stylesWrapperGeneral } from '@/pages/Dashboard/Reservacion/ReservacionStyles';

const Reservacion = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormReservacion />
    </Box>
  );
};

export default Reservacion;
