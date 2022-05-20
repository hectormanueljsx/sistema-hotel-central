import React, { useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

const ModalTarifa = dataTarifa => {
  const [data, setData] = useState({
    id: dataTarifa.datos.id,
    descripcion: dataTarifa.datos.descripcion,
    precio: dataTarifa.datos.precio,
    numPersonas: dataTarifa.datos.no_personas,
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

      await putGeneralTable(identifier, password, endpoint, dataTarifa.datos.id, generalData);
      location.reload();
      console.log(data);
    } else {
      alert('Por favor, llene todos los campos');
    }
  };
  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 400, height: 540.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Nueva Tarifa' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='ID' />
          <TextField
            value={dataTarifa.datos.id}
            name='id'
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
          <TitleInput titleInput='Descripción de la tarifa' />
          <TextField
            defaultValue={dataTarifa.datos.descripcion}
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
            defaultValue={dataTarifa.datos.precio}
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
            defaultValue={dataTarifa.datos.no_personas}
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
        <Button
          variant='contained'
          size='large'
          onClick={updateDatos}
          startIcon={<UpdateRoundedIcon />}
          sx={{ marginTop: 2 }}
        >
          Actualizar Tarifa
        </Button>
      </Box>
    </Container>
  );
};

export default ModalTarifa;
