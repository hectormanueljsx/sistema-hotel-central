import React from 'react';
import { Box } from '@mui/material';

import FormCreateUsuario from '@/pages/Administracion/Usuario/FormCreateUsuario';
import TableViewUsuarios from '@/pages/Administracion/Usuario/TableViewUsuarios';
import { stylesWrapperGeneral } from '@/pages/Administracion/Usuario/UsuarioStyles';

const Usuarios = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormCreateUsuario />
      <TableViewUsuarios />
    </Box>
  );
};

export default Usuarios;
