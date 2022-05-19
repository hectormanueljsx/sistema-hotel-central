import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import AlertGlobalForms from '@/components/AlertGlobalForms';
import FormCreateUsuario from '@/components/Habitaciones/Usuario/FormCreateUsuario';
import TableViewUsuarios from '@/components/Habitaciones/Usuario/TableViewUsuarios';

const Usuarios = () => {
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
        <FormCreateUsuario
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
          setOpenAlert={setOpenAlert}
        />
        <TableViewUsuarios />
      </Box>
    </Container>
  );
};

export default Usuarios;
