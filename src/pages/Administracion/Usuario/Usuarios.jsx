import React from 'react';
import { Box, Container } from '@mui/material';

import FormCreateUsuario from '@/pages/Administracion/Usuario/FormCreateUsuario';
import TableViewUsuarios from '@/pages/Administracion/Usuario/TableViewUsuarios';
import { stylesBoxUsuarios } from '@/pages/Administracion/Usuario/UsuarioStyles';

const Usuarios = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxUsuarios}>
        <FormCreateUsuario />
        <TableViewUsuarios />
      </Box>
    </Container>
  );
};

export default Usuarios;
