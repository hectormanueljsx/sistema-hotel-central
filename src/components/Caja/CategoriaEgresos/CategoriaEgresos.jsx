import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import AlertGlobalForms from '@/components/AlertGlobalForms';
import FormCreateCategoriaEgresos from '@/components/Caja/CategoriaEgresos/FormCreateCategoriaEgresos';
import TableViewCategoriaEgresos from '@/components/Caja/CategoriaEgresos/TableViewCategoriaEgresos';

const CategoriaEgresos = () => {
  const [messageError, setMessageError] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');
  const [openAlert, setOpenAlert] = useState(true);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <CssBaseline />
      {messageError && (
        <AlertGlobalForms message={messageError} open={openAlert} setOpen={setOpenAlert} severity='error' />
      )}
      {messageSuccess && (
        <AlertGlobalForms message={messageSuccess} open={openAlert} setOpen={setOpenAlert} severity='success' />
      )}
      <Box sx={{ display: 'flex' }}>
        <FormCreateCategoriaEgresos
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
          setOpenAlert={setOpenAlert}
        />
        <TableViewCategoriaEgresos />
      </Box>
    </Container>
  );
};

export default CategoriaEgresos;
