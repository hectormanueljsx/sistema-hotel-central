import React from 'react';
import { Box } from '@mui/material';

import FormCreateCategoriaEgresos from '@/pages/Caja/CategoriaEgresos/FormCreateCategoriaEgresos';
import FormCreateSubcategoriaEgresos from '@/pages/Caja/CategoriaEgresos/FormCreateSubcategoriaEgresos';
import TableViewCategoriaEgresos from '@/pages/Caja/CategoriaEgresos/TableViewCategoriaEgresos';
import { stylesWrapperGeneral, stylesWrapperInternal } from '@/pages/Caja/CategoriaEgresos/CategoriaEgresosStyles';

const CategoriaEgresos = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <Box component='section' sx={stylesWrapperInternal}>
        <FormCreateCategoriaEgresos />
        <FormCreateSubcategoriaEgresos />
      </Box>
      <TableViewCategoriaEgresos />
    </Box>
  );
};

export default CategoriaEgresos;
