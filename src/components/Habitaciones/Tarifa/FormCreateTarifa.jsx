import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

const FormCreateTarifa = ({ setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [datos, setDatos] = useState({
    descripcion: '',
    precio: '',
    numPersonas: '',
  });

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.tarifa;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });

  const sendDatos = async event => {
    event.preventDefault();

    if (datos.descripcion.trim().length > 0 && datos.precio.trim().length > 0 && datos.numPersonas.trim().length > 0) {
      const generalData = {
        descripcion: datos.descripcion.toUpperCase(),
        precio: datos.precio,
        no_personas: datos.numPersonas,
      };

      await postGeneralTable(identifier, password, endpoint, generalData);
      setOpenAlert(true);
      setMessageInfo('Tarifa registrada correctamente');
      setMessageSeverity('success');
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      setOpenAlert(true);
      setMessageInfo('Por favor, rellene todos los campos');
      setMessageSeverity('error');
    }
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 400, height: 418.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Nueva Tarifa' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Descripción de la tarifa' />
          <TextField
            onChange={handleInputChange}
            name='descripcion'
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
          <TextField
            onChange={handleInputChange}
            name='precio'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            placeholder='500'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='No. de personas' />
          <TextField
            onChange={handleInputChange}
            name='numPersonas'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            placeholder='1'
            required
            fullWidth
          />
        </Box>
        <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Tarifa
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateTarifa;
