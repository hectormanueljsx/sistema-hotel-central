import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

const ModalTarifa = ({ dataTarifa, setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [data, setData] = useState({
    id: dataTarifa.id,
    descripcion: dataTarifa.descripcion,
    precio: dataTarifa.precio,
    numPersonas: dataTarifa.no_personas,
  });

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.tarifa;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });

  const updateDatos = async event => {
    event.preventDefault();

    if (data.descripcion && data.precio && data.numPersonas) {
      const generalData = {
        descripcion: data.descripcion.toUpperCase(),
        precio: data.precio,
        no_personas: data.numPersonas,
      };

      await putGeneralTable(identifier, password, endpoint, dataTarifa.id, generalData);
      setOpenAlert(true);
      setMessageInfo('Tarifa actualizada correctamente');
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
    <Container
      component='section'
      disableGutters
      sx={[stylesContainerSection, { width: 400, height: 418.25, marginTop: 0 }]}
    >
      <CssBaseline />
      <TitlePage titlePage='Actualización de Tarifa' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Descripción de la tarifa' />
          <TextField
            defaultValue={dataTarifa.descripcion}
            onChange={handleInputChange}
            name='descripcion'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Precio de la tarifa' />
          <TextField
            defaultValue={dataTarifa.precio}
            onChange={handleInputChange}
            name='precio'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='No. de personas' />
          <TextField
            defaultValue={dataTarifa.no_personas}
            onChange={handleInputChange}
            name='numPersonas'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Button variant='contained' size='large' onClick={updateDatos} startIcon={<UpdateIcon />} sx={{ marginTop: 2 }}>
          Actualizar Tarifa
        </Button>
      </Box>
    </Container>
  );
};

export default ModalTarifa;
