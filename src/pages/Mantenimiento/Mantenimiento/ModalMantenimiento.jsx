import React, { useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonAlignEnd,
  stylesButtonCloseModal,
  stylesButtonSend,
  stylesGridWrapperButtons,
  stylesGridWrapperModal,
  stylesWidthAutoButtons,
  stylesWidthHeightModal,
  stylesWrapperBoxShadow,
} from '@/pages/Mantenimiento/Mantenimiento/MantenimientoStyles';

const ModalMantenimiento = ({ habitacion, subcategoria, dataMantenimiento, handleCloseModal }) => {
  const [datos, setDatos] = useState({
    fechaInicio: dataMantenimiento.f_inicio,
    fechafin: dataMantenimiento.f_fin,
    motivo: dataMantenimiento.motivo,
    precio: dataMantenimiento.costo,
    reporta: dataMantenimiento.reporta,
    fechaReporte: dataMantenimiento.f_reporte,
    trabajador: dataMantenimiento.trabajador,
    estado: dataMantenimiento.estado,
  });
  const [idHabitacion, setIdHabitacion] = useState(dataMantenimiento.habitacion.id);
  const [idSubcategoria, setIdSubcategoria] = useState(dataMantenimiento.subcategoria.id);
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointMantenimiento = generalEndpoints.mantenimiento;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });
  const handleHabitacion = event => setIdHabitacion(event.target.value);
  const handleSubcategoria = event => setIdSubcategoria(event.target.value);

  const viewDisabled = event => {
    event.preventDefault();
    setDisabledModal(false);
    setDisableView(true);
  };

  const sendDatos = async event => {
    event.preventDefault();

    if (datos.motivo && idHabitacion && idSubcategoria) {
      let status = 'NO REALIZADO';

      if (datos.fechaInicio && !datos.fechafin) {
        status = 'EN PROCESO';
      } else if (datos.fechaInicio && datos.fechafin) {
        status = 'FINALIZADO';
      }

      const generalData = {
        f_reporte: datos.fechaReporte,
        f_inicio: datos.fechaInicio,
        f_fin: datos.fechafin,
        motivo: datos.motivo.toUpperCase(),
        estado: status,
        costo: datos.precio,
        reporta: datos.reporta,
        trabajador: datos.trabajador ? datos.trabajador.toUpperCase() : datos.trabajador,
        habitacion: { id: idHabitacion },
        subcategoria: { id: idSubcategoria },
      };

      setLoadingBtn(true);
      const res = await putGeneralTable(identifier, password, endpointMantenimiento, dataMantenimiento.id, generalData);
      setLoadingBtn(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Mantenimiento actualizado correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-container',
          },
        }).then(result => {
          if (result.isConfirmed) {
            handleCloseModal();
            location.reload();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al actualizar mantenimiento',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-container',
          },
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
        customClass: {
          container: 'swal-container',
        },
      });
    }
  };

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Mantenimiento' />
      <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesButtonCloseModal}>
        <CloseIcon />
      </Button>
      <Box component='form' sx={stylesGridWrapperModal}>
        <Box component='div'>
          <TitleInput titleInput='Motivo' />
          <TextField
            defaultValue={dataMantenimiento.motivo}
            onChange={handleInputChange}
            name='motivo'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            disabled={disabledModal}
            multiline
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Fecha de inicio' />
          <TextField
            defaultValue={dataMantenimiento.f_inicio}
            onChange={handleInputChange}
            name='fechaInicio'
            variant='outlined'
            type='date'
            margin='none'
            size='small'
            disabled={disabledModal}
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Fecha de termino' />
          <TextField
            defaultValue={dataMantenimiento.f_fin}
            onChange={handleInputChange}
            name='fechafin'
            variant='outlined'
            type='date'
            margin='none'
            size='small'
            disabled={disabledModal}
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Precio' />
          <TextField
            defaultValue={dataMantenimiento.costo}
            onChange={handleInputChange}
            name='precio'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            disabled={disabledModal}
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Habitación' />
          <FormControl fullWidth disabled={disabledModal}>
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
          <TitleInput titleInput='Estado' />
          <TextField
            defaultValue={dataMantenimiento.estado}
            name='estado'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            disabled={true}
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Realizado por' />
          <TextField
            defaultValue={dataMantenimiento.trabajador}
            onChange={handleInputChange}
            name='trabajador'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            disabled={disabledModal}
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Reportado por' />
          <TextField
            defaultValue={dataMantenimiento.reporta}
            onChange={handleInputChange}
            name='reporta'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            disabled={disabledModal}
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Categoría' />
          <FormControl fullWidth disabled={disabledModal}>
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
        <Box component='div'>
          <TitleInput titleInput='Usuario' />
          <TextField
            defaultValue={dataMantenimiento.users_permissions_user.username}
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            disabled={true}
            required
            fullWidth
          />
        </Box>
      </Box>
      {loadingBtn ? (
        <Box component='div' sx={stylesButtonSend}>
          <ButtonLoader />
        </Box>
      ) : (
        <Box component='div' sx={stylesGridWrapperButtons}>
          <Box component='div' sx={stylesButtonAlignEnd}>
            <Button
              variant='contained'
              disabled={disableView}
              onClick={viewDisabled}
              size='large'
              startIcon={<EditIcon />}
              sx={stylesWidthAutoButtons}
            >
              Modificar
            </Button>
          </Box>
          <Box component='div'>
            <Button
              variant='contained'
              disabled={disabledModal}
              onClick={sendDatos}
              size='large'
              startIcon={<UpdateIcon />}
              sx={stylesWidthAutoButtons}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ModalMantenimiento;
