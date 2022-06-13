import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import AlertGlobalForms from '@/components/Alert/AlertGlobalForms';
import FormCreateUsuario from '@/components/Administracion/Usuario/FormCreateUsuario';
import TableViewUsuarios from '@/components/Administracion/Usuario/TableViewUsuarios';
import { stylesBoxUsuarios } from '@/components/Administracion/Usuario/UsuarioStyles';

const Usuarios = () => {
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
        <FormCreateUsuario
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
        />
        <TableViewUsuarios
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
        />
      </Box>
    </Container>
  );
};

export default Usuarios;
