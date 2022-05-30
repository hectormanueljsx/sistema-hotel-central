import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Reportes/stylesReportes';

const FormCreateMantenimiento = ({ setOpenAlert, setMessageInfo, setMessageSeverity, habitacion, subcategoria }) => {
  const [datos, setDatos] = useState({
    fechInicio: '',
    motivo: '',
    precio: '',
  });
  const [idHabitacion, setIdHabitacion] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const idUser = localStorage.getItem('id');

  const endpointMantenimiento = generalEndpoints.mantenimiento;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });
  const handleHabitacion = event => setIdHabitacion(event.target.value);
  const handleSubcategoria = event => setIdSubcategoria(event.target.value);

  const sendDatos = async event => {
    event.preventDefault();

    if (
      datos.motivo.trim().length > 0 &&
      datos.precio.trim().length > 0 &&
      datos.fechInicio.length > 0 &&
      idHabitacion &&
      idSubcategoria
    ) {
      const generalData = {
        f_inicio: datos.fechInicio,
        motivo: datos.motivo.toUpperCase(),
        costo: datos.precio,
        habitacion: { id: idHabitacion },
        users_permissions_user: { id: idUser },
        subcategoria: { id: idSubcategoria },
      };

      const res = await postGeneralTable(identifier, password, endpointMantenimiento, generalData);

      if (res.status >= 200 && res.status <= 299) {
        setOpenAlert(true);
        setMessageInfo('Mantenimiento registrada correctamente');
        setMessageSeverity('success');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al registrar Mantenimiento');
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
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 400, height: 683.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Nuevo Mantenimiento' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Motivo del Mantenimiento' />
          <TextField
            onChange={handleInputChange}
            name='motivo'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='construcción'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Fecha de Inicio' />
          <TextField
            onChange={handleInputChange}
            name='fechInicio'
            variant='outlined'
            type='date'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Precio' />
          <TextField
            onChange={handleInputChange}
            name='precio'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            placeholder='$0.00'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Habitacion' />
          <FormControl fullWidth>
            <Select size='small' value={idHabitacion} onChange={handleHabitacion}>
              {habitacion.map((item, index) => {
                const { num_hab, id } = item;
                return (
                  <MenuItem key={index} value={id}>
                    {num_hab}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Categoria' />
          <FormControl fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubcategoria}>
              {subcategoria.map((item, index) => {
                const { descripcion, id } = item;
                return (
                  <MenuItem key={index} value={id}>
                    {descripcion}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Mantenimiento
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateMantenimiento;
