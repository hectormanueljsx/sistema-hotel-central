import React from 'react';
import { Box, Container } from '@mui/material';

import FormCreateCategoriaEgresos from '@/components/Caja/CategoriaEgresos/FormCreateCategoriaEgresos';
import TableViewCategoriaEgresos from '@/components/Caja/CategoriaEgresos/TableViewCategoriaEgresos';
import { stylesBoxCategoriaEgresos } from '@/components/Caja/CategoriaEgresos/CategoriaEgresosStyles';

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
