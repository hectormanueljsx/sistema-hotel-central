import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import FormSearchIngresos from './FormSearchIngresos';

const IngresosPeriodo = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormSearchIngresos />
        {/*FALTA CREAR EL FORMULARIO DE LA TABLA  <TableViewCategorias /> */}
      </Box>
    </Container>
  );
};

export default IngresosPeriodo;
