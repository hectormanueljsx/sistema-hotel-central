import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesBoxButtons,
  stylesBoxInputs,
  stylesBoxModal,
  stylesButtonSend,
  stylesContainerBox,
  stylesContainerBoxButtonAlign,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightModal,
  stylesWidthInput,
} from '@/components/Habitaciones/Tarifa/TarifaStyles';

const ModalTarifa = ({ dataTarifa, setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [data, setData] = useState({
    id: dataTarifa.id,
    descripcion: dataTarifa.descripcion,
    precio: dataTarifa.precio,
    numPersonas: dataTarifa.no_personas,
  });
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointTarifa = generalEndpoints.tarifa;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });

  const viewDisabled = event => {
    event.preventDefault();
    setDisabledModal(false);
    setDisableView(true);
  };

  const updateDatos = async event => {
    event.preventDefault();

    if (data.descripcion && data.precio && data.numPersonas) {
      const generalData = {
        descripcion: data.descripcion.toUpperCase(),
        precio: data.precio,
        no_personas: data.numPersonas,
      };

      const res = await putGeneralTable(identifier, password, endpointTarifa, dataTarifa.id, generalData);

      if (res.status >= 200 && res.status <= 299) {
        setOpenAlert(true);
        setMessageInfo('Tarifa actualizada correctamente');
        setMessageSeverity('success');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al actualizar tarifa');
        setMessageSeverity('error');
        return;
      }
    } else {
      setOpenAlert(true);
      setMessageInfo('Por favor, rellene todos los campos');
      setMessageSeverity('error');
    }
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Tarifa' />
      <Box component='form' sx={stylesBoxModal}>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Descripción de la tarifa' />
            <TextField
              disabled={disabledModal}
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Precio de la tarifa' />
            <TextField
              disabled={disabledModal}
              defaultValue={dataTarifa.precio}
              onChange={handleInputChange}
              name='precio'
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Nº de personas' />
            <TextField
              disabled={disabledModal}
              defaultValue={dataTarifa.no_personas}
              onChange={handleInputChange}
              name='numPersonas'
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={stylesBoxButtons}>
          <Box component='div' sx={[stylesContainerBoxButtonAlign, stylesWidthInput]}>
            <Button
              variant='contained'
              disabled={disableView}
              onClick={viewDisabled}
              size='large'
              startIcon={<EditIcon />}
            >
              Modificar
            </Button>
          </Box>
          <Box component='div' sx={stylesWidthInput}>
            <Button
              variant='contained'
              disabled={disabledModal}
              onClick={updateDatos}
              size='large'
              startIcon={<UpdateIcon />}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ModalTarifa;
