import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';
import { generalEndpoints } from '../../../utilities/endpoints';
import { postGeneralTable } from '../../../services/postGeneralTable';

const FormCreateTarifa = () => {
  const [datos, setDatos] = useState({
    descripcion: '',
    precio: '',
    numPersonas: '',
  });
  const handleInputChange = event => {
    setDatos({ ...datos, [event.target.name]: event.target.value });
  };

  const enviarDatos = event => {
    event.preventDefault();
    const identifier = 'test@email.com';
    const password = 'Test123';
    const endpoint = generalEndpoints.tarifa;
    if (datos.descripcion && datos.precio && datos.numPersonas) {
      const generalData = {
        descripcion: datos.descripcion.toUpperCase(),
        precio: datos.precio,
        no_personas: datos.numPersonas,
      };
      const postTarifa = postGeneralTable(identifier, password, endpoint, generalData);
      console.log(generalData);
      datos.descripcion = '';
      datos.precio = '';
      datos.numPersonas = '';
    } else {
      console.log('Rellenar los datos');
    }
  };

  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 450.25 }]}>
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
            type='text'
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
            type='text'
            margin='none'
            size='small'
            placeholder='1'
            required
            fullWidth
          />
        </Box>
        <Button variant='contained' onClick={enviarDatos} size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Tarifa
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateTarifa;
