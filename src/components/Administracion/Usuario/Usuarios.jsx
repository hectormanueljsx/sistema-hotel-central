import React from 'react';
import { Box, Container } from '@mui/material';

import FormCreateUsuario from '@/components/Administracion/Usuario/FormCreateUsuario';
import TableViewUsuarios from '@/components/Administracion/Usuario/TableViewUsuarios';
import { stylesBoxUsuarios } from '@/components/Administracion/Usuario/UsuarioStyles';

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
