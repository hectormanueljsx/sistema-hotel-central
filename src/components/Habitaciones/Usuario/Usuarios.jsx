import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormCreateUsuario from '@/components/Habitaciones/Usuario/FormCreateUsuario';
import TableViewUsuarios from '@/components/Habitaciones/Usuario/TableViewUsuarios';

const Usuarios = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormCreateUsuario />
        <TableViewUsuarios />
      </Box>
    </Container>
  );
};

export default Usuarios;
