import React from 'react';
import { Box } from '@mui/material';

import { stylesWrapperGeneral } from '@/pages/Dashboard/Registros/DatosRegistro/DatosRegistroStyles';
import FormDatosRegistro from '@/pages/Dashboard/Registros/DatosRegistro/FormDatosRegistro';

const DatosRegistro = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormDatosRegistro />
    </Box>
  );
};

export default DatosRegistro;
