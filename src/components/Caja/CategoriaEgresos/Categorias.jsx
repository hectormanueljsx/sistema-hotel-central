import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import FormCreateCategoria from './FormCreateCategoria';
import TableViewCategorias from './TableViewCategorias';

const Categorias = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormCreateCategoria />
        <TableViewCategorias />
      </Box>
    </Container>
  );
};

export default Categorias;
