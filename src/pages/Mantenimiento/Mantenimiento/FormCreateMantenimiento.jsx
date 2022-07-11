import React, { useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Mantenimiento/Mantenimiento/MantenimientoStyles';

const FormCreateMantenimiento = ({ habitacion, subcategoria }) => {
  const [datos, setDatos] = useState({
    reporta: '',
    motivo: '',
  });
  const [idHabitacion, setIdHabitacion] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

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

      setLoadingBtn(true);
      const res = await postGeneralTable(identifier, password, endpointMantenimiento, generalData);
      setLoadingBtn(false);

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
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Fallas' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
          <TitleInput titleInput='Motivo' />
          <TextField
            onChange={handleInputChange}
            name='motivo'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            multiline
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div'>
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
        <Box component='div'>
          <TitleInput titleInput='Habitación' />
          <FormControl fullWidth>
            <Select size='small' value={idHabitacion} onChange={handleHabitacion}>
              {habitacion.length > 0 ? (
                habitacion.map(item => {
                  const { num_hab, id } = item;

                  return (
                    <MenuItem key={id} value={id}>
                      {num_hab}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Subcategoría' />
          <FormControl fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubcategoria}>
              {subcategoria.length > 0 ? (
                subcategoria.map(item => {
                  const { descripcion, id, status } = item;

                  return status ? (
                    <MenuItem key={id} value={id}>
                      {descripcion}
                    </MenuItem>
                  ) : (
                    false
                  );
                })
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {loadingBtn ? (
        <Box component='div' sx={stylesButtonSend}>
          <ButtonLoader />
        </Box>
      ) : (
        <Box component='div' sx={stylesButtonSend}>
          <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />}>
            Registrar Mantenimiento
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FormCreateMantenimiento;
