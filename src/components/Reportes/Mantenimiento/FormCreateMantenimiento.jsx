import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Reportes/stylesReportes';

const FormCreateMantenimiento = ({ setOpenAlert, setMessageInfo, setMessageSeverity, habitacion, subcategoria }) => {
  const [datos, setDatos] = useState({
    reporta: '',
    motivo: '',
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

    const date = new Date();

    if (datos.motivo.trim().length > 0 && datos.reporta.trim().length > 0 && idHabitacion && idSubcategoria) {
      const generalData = {
        f_reporte: date.toISOString(),
        motivo: datos.motivo.toUpperCase(),
        reporta: datos.reporta.toUpperCase(),
        habitacion: { id: idHabitacion },
        users_permissions_user: { id: idUser },
        subcategoria: { id: idSubcategoria },
      };
      console.log(generalData);
      const res = await postGeneralTable(identifier, password, endpointMantenimiento, generalData);

      if (res.status >= 200 && res.status <= 299) {
        setOpenAlert(true);
        setMessageInfo('Mantenimiento registrado correctamente');
        setMessageSeverity('success');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al registrar mantenimiento');
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
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 400, height: 522.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Fallas' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Motivo' />
          <TextField
            onChange={handleInputChange}
            name='motivo'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Construcción'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Quien reporta?' />
          <TextField
            onChange={handleInputChange}
            name='reporta'
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
          <TitleInput titleInput='Habitacion' />
          <FormControl fullWidth>
            <Select size='small' value={idHabitacion} onChange={handleHabitacion}>
              {habitacion.map(item => {
                const { num_hab, id } = item;

                return (
                  <MenuItem key={id} value={id}>
                    {num_hab}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Subcategoria' />
          <FormControl fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubcategoria}>
              {subcategoria.map(item => {
                const { descripcion, id } = item;

                return (
                  <MenuItem key={id} value={id}>
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
