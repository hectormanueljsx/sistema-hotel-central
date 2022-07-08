import React from 'react';
import { Box, Container } from '@mui/material';

import FormCreateHabitaciones from '@/pages/Habitaciones/Habitaciones/FormCreateHabitaciones';
import TableViewHabitaciones from '@/pages/Habitaciones/Habitaciones/TableViewHabitaciones';
import { stylesBoxHabitaciones } from '@/pages/Habitaciones/Habitaciones/HabitacionesStyles';

const Habitaciones = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxHabitaciones}>
        <FormCreateHabitaciones />
        <TableViewHabitaciones />
      </Box>
    </Container>
  );
};

export default Habitaciones;
