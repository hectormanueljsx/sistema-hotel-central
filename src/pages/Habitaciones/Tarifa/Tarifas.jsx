import React from 'react';
import { Box, Container } from '@mui/material';

import FormCreateTarifa from '@/pages/Habitaciones/Tarifa/FormCreateTarifa';
import TableViewTarifas from '@/pages/Habitaciones/Tarifa/TableViewTarifas';
import { stylesBoxTarifas } from '@/pages/Habitaciones/Tarifa/TarifaStyles';

const Tarifas = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxTarifas}>
        <FormCreateTarifa />
        <TableViewTarifas />
      </Box>
    </Container>
  );
};

export default Tarifas;
