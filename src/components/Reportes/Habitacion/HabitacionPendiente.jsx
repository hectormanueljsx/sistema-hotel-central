import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import TableViewHabitacionPendiente from './TableViewHabitacionPendiente';

const HabitacionPendiente = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TableViewHabitacionPendiente />
      </Box>
    </Container>
  );
};

export default HabitacionPendiente;
