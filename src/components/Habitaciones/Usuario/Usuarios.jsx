import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormCreateUsuario from './FormCreateUsuario';
import TableViewUsuarios from './TableViewUsuarios';

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
