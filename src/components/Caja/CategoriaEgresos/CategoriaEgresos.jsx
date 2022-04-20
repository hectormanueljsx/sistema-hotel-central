import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormCreateCategoriaEgresos from './FormCreateCategoriaEgresos';
import TableViewCategoriaEgresos from './TableViewCategoriaEgresos';

const CategoriaEgresos = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormCreateCategoriaEgresos />
        <TableViewCategoriaEgresos />
      </Box>
    </Container>
  );
};

export default CategoriaEgresos;
