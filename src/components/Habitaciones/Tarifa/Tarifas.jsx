import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import AlertGlobalForms from '@/components/AlertGlobalForms';
import FormCreateTarifa from '@/components/Habitaciones/Tarifa/FormCreateTarifa';
import TableViewTarifas from '@/components/Habitaciones/Tarifa/TableViewTarifas';

const Tarifas = () => {
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
        <FormCreateTarifa
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
          setOpenAlert={setOpenAlert}
        />
        <TableViewTarifas />
      </Box>
    </Container>
  );
};

export default Tarifas;
