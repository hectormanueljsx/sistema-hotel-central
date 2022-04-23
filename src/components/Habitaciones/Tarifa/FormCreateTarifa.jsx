import React from 'react';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/habitaciones/stylesHabitaciones';

const FormCreateTarifa = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 418.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Nueva Tarifa' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Descripción de la tarifa' />
          <TextField
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Doble 1 cama'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Precio de la tarifa' />
          <TextField variant='outlined' type='text' margin='none' size='small' placeholder='500' required fullWidth />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='No. de personas' />
          <TextField variant='outlined' type='text' margin='none' size='small' placeholder='1' required fullWidth />
        </Box>
        <Button variant='contained' size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Tarifa
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateTarifa;
