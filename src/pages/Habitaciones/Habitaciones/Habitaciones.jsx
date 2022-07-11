import React from 'react';
import { Box } from '@mui/material';

import FormCreateHabitaciones from '@/pages/Habitaciones/Habitaciones/FormCreateHabitaciones';
import TableViewHabitaciones from '@/pages/Habitaciones/Habitaciones/TableViewHabitaciones';
import { stylesWrapperGeneral } from '@/pages/Habitaciones/Habitaciones/HabitacionesStyles';

const Habitaciones = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormCreateHabitaciones />
      <TableViewHabitaciones />
    </Box>
  );
};

export default Habitaciones;
