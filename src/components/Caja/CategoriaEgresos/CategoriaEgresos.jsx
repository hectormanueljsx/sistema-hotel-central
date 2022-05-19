import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import AlertGlobalForms from '@/components/AlertGlobalForms';
import FormCreateCategoriaEgresos from '@/components/Caja/CategoriaEgresos/FormCreateCategoriaEgresos';
import TableViewCategoriaEgresos from '@/components/Caja/CategoriaEgresos/TableViewCategoriaEgresos';
import { stylesBoxAlerts } from '@/components/Caja/stylesCaja';

const CategoriaEgresos = () => {
  const [messageError, setMessageError] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={stylesBoxAlerts}>
          {messageError && <AlertGlobalForms message={messageError} severity='error' />}
          {messageSuccess && <AlertGlobalForms message={messageSuccess} severity='success' />}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <FormCreateCategoriaEgresos setMessageError={setMessageError} setMessageSuccess={setMessageSuccess} />
          <TableViewCategoriaEgresos />
        </Box>
      </Box>
    </Container>
  );
};

export default CategoriaEgresos;
