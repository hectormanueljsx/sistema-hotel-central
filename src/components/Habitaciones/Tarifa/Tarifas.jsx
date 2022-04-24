import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormCreateTarifa from '@/components/Habitaciones/Tarifa/FormCreateTarifa';
import TableViewTarifas from '@/components/Habitaciones/Tarifa/TableViewTarifas';

const Tarifas = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormCreateTarifa />
        <TableViewTarifas />
      </Box>
    </Container>
  );
};

export default Tarifas;
