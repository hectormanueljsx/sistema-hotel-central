import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import AlertGlobalForms from '@/components/Alert/AlertGlobalForms';
import FormCreateCategoriaEgresos from '@/components/Caja/CategoriaEgresos/FormCreateCategoriaEgresos';
import TableViewCategoriaEgresos from '@/components/Caja/CategoriaEgresos/TableViewCategoriaEgresos';
import { stylesBoxUsuarios } from '@/components/Caja/CategoriaEgresos/CategoriaEgresosStyles';

const CategoriaEgresos = () => {
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
      <Box sx={stylesBoxUsuarios}>
        <FormCreateCategoriaEgresos
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
        />
        <TableViewCategoriaEgresos />
      </Box>
    </Container>
  );
};

export default CategoriaEgresos;
