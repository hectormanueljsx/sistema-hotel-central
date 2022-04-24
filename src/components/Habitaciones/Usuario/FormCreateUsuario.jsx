import React from 'react';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

const FormCreateUsuario = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 502.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Nuevo Usuario' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Nombre de usuario' />
          <TextField
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Nombre'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Contraseña' />
          <TextField
            variant='outlined'
            type='password'
            margin='none'
            size='small'
            placeholder='Contraseña'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Confirmar contraseña' />
          <TextField
            variant='outlined'
            type='password'
            margin='none'
            size='small'
            placeholder='Contraseña'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Selecciona rol' />
        </Box>
        <Button variant='contained' size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Usuario
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateUsuario;
