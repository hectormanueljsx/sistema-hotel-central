import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import TableViewHabitacionPendiente from '@/components/Reportes/Habitacion/TableViewHabitacionPendiente';

const HabitacionPendiente = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TableViewHabitacionPendiente />
      </Box>
    </Container>
  );
};

export default HabitacionPendiente;
