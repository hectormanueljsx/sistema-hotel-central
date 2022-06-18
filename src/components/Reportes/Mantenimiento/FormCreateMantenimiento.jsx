import React, { useState } from 'react';
import { Box, Button, Container, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Reportes/Mantenimiento/MantenimientoStyles';

const FormCreateMantenimiento = ({ habitacion, subcategoria }) => {
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

      const res = await postGeneralTable(identifier, password, endpointMantenimiento, generalData);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Mantenimiento registrado correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar mantenimiento',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightForm]}>
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
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Reportado por' />
          <TextField
            onChange={handleInputChange}
            name='reporta'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Habitación' />
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
          <TitleInput titleInput='Subcategoría' />
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
        <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={stylesButtonSend}>
          Registrar Mantenimiento
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateMantenimiento;
