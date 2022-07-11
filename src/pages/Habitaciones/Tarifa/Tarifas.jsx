import React from 'react';
import { Box } from '@mui/material';

import FormCreateTarifa from '@/pages/Habitaciones/Tarifa/FormCreateTarifa';
import TableViewTarifas from '@/pages/Habitaciones/Tarifa/TableViewTarifas';
import { stylesWrapperGeneral } from '@/pages/Habitaciones/Tarifa/TarifaStyles';

const Tarifas = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormCreateTarifa />
      <TableViewTarifas />
    </Box>
  );
};

export default Tarifas;
