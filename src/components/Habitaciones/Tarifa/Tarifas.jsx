import React from 'react';
import { Box, Container } from '@mui/material';

import FormCreateTarifa from '@/components/Habitaciones/Tarifa/FormCreateTarifa';
import TableViewTarifas from '@/components/Habitaciones/Tarifa/TableViewTarifas';
import { stylesBoxTarifas } from '@/components/Habitaciones/Tarifa/TarifaStyles';

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
