import React from 'react';
import { Box } from '@mui/material';

import TableViewEmpresaClientes from '@/pages/Reservas/EmpresaClientes/TableViewEmpresaClientes';
import { stylesWrapperGeneral } from '@/pages/Reservas/EmpresaClientes/EmpresaClientesStyles';

const EmpresaClientes = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <TableViewEmpresaClientes />
    </Box>
  );
};

export default EmpresaClientes;
