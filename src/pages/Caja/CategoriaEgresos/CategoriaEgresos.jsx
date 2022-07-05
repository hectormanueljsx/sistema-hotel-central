import React from 'react';
import { Box, Container } from '@mui/material';

import FormCreateCategoriaEgresos from '@/pages/Caja/CategoriaEgresos/FormCreateCategoriaEgresos';
import TableViewCategoriaEgresos from '@/pages/Caja/CategoriaEgresos/TableViewCategoriaEgresos';
import { stylesBoxCategoriaEgresos } from '@/pages/Caja/CategoriaEgresos/CategoriaEgresosStyles';

const CategoriaEgresos = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxCategoriaEgresos}>
        <FormCreateCategoriaEgresos />
        <TableViewCategoriaEgresos />
      </Box>
    </Container>
  );
};

export default CategoriaEgresos;
