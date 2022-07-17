import React from 'react';
import { Box } from '@mui/material';

import FormDatosRegistro from '@/pages/Dashboard/Registros/DatosRegistro/FormDatosRegistro';
import { stylesWrapperGeneral } from '@/pages/Dashboard/Registros/DatosRegistro/DatosRegistroStyles';

const DatosRegistro = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormDatosRegistro />
    </Box>
  );
};

export default DatosRegistro;
