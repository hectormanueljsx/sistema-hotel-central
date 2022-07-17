import React from 'react';
import { Box } from '@mui/material';

import RegistrosTabs from '@/pages/Dashboard/Registros/RegistrosTabs';
import { stylesWrapperGeneral } from '@/pages/Dashboard/Registros/RegistrosStyles';

const Registros = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <RegistrosTabs />
    </Box>
  );
};

export default Registros;
