import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import AlertGlobalForms from '@/components/Alert/AlertGlobalForms';
import FormCreateHabitaciones from '@/components/Habitaciones/Habitaciones/FormCreateHabitaciones';
import TableViewHabitaciones from '@/components/Habitaciones/Habitaciones/TableViewHabitaciones';
import { stylesBoxHabitaciones } from '@/components/Habitaciones/Habitaciones/HabitacionesStyles';

const Habitaciones = () => {
  const [messageInfo, setMessageInfo] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('');
  const [openAlert, setOpenAlert] = useState(true);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      {messageInfo && (
        <AlertGlobalForms
          open={openAlert}
          setOpen={setOpenAlert}
          messageInfo={messageInfo}
          messageSeverity={messageSeverity || 'info'}
        />
      )}
      <Box sx={stylesBoxHabitaciones}>
        <FormCreateHabitaciones
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
        />
        <TableViewHabitaciones
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
        />
      </Box>
    </Container>
  );
};

export default Habitaciones;
