import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormCreateEgresos from '@/components/Caja/Egresos/FormCreateEgresos';
import TableViewEgresos from '@/components/Caja/Egresos/TableViewEgresos';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';

const Egresos = () => {
  const [pago, setPago] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpointPago = generalEndpoints.pago;
  const endpointCategoria = generalEndpoints.categoria;

  async function getPago() {
    await getGeneralSelect(identifier, password, endpointPago).then(res => {
      setPago(res);
    });
  }
  document.addEventListener('DOMContentLoaded', getPago, false);

  async function getCategoria() {
    await getGeneralSelect(identifier, password, endpointCategoria).then(result => {
      setCategoria(result);
    });
  }
  document.addEventListener('DOMContentLoaded', getCategoria, false);
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormCreateEgresos pago={pago} categoria={categoria}/>
        <TableViewEgresos pago={pago} categoria={categoria}/>
      </Box>
    </Container>
  );
};

export default Egresos;
