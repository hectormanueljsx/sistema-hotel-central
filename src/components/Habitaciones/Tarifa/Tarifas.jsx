import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import AlertGlobalForms from '@/components/AlertGlobalForms';
import FormCreateTarifa from '@/components/Habitaciones/Tarifa/FormCreateTarifa';
import TableViewTarifas from '@/components/Habitaciones/Tarifa/TableViewTarifas';

const Tarifas = () => {
  const [messageInfo, setMessageInfo] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('');
  const [openAlert, setOpenAlert] = useState(true);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <CssBaseline />
      {messageInfo && (
        <AlertGlobalForms
          open={openAlert}
          setOpen={setOpenAlert}
          messageInfo={messageInfo}
          messageSeverity={messageSeverity || 'info'}
        />
      )}
      <Box sx={{ display: 'flex' }}>
        <FormCreateTarifa
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
        />
        <TableViewTarifas
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
        />
      </Box>
    </Container>
  );
};

export default Tarifas;
