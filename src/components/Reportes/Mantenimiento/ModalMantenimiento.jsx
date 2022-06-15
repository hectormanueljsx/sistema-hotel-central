import React, { useState } from 'react';
import { Box, Button, Container, FormControl, MenuItem, Select, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesBoxButtons,
  stylesBoxInputs,
  stylesBoxModal,
  stylesContainerBoxButtonAlign,
  stylesContainerInput,
  stylesContainerSection,
  stylesModalClose,
  stylesWidthHeightModal,
  stylesWidthInput,
} from '@/components/Reportes/Mantenimiento/MantenimientoStyles';

const ModalMantenimiento = ({
  habitacion,
  subcategoria,
  dataMantenimiento,
  handleCloseModal,
  setOpenAlert,
  setMessageInfo,
  setMessageSeverity,
}) => {
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
        trabajador: datos.trabajador,
        habitacion: { id: idHabitacion },
        subcategoria: { id: idSubcategoria },
      };
      const res = await putGeneralTable(identifier, password, endpointMantenimiento, dataMantenimiento.id, generalData);

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
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Mantenimiento' />
      <Box component='form' sx={stylesBoxModal}>
        <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesModalClose}>
          <CloseIcon />
        </Button>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Motivo del mantenimiento' />
            <TextField
              defaultValue={dataMantenimiento.motivo}
              onChange={handleInputChange}
              name='motivo'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={disabledModal}
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Precio' />
            <TextField
              defaultValue={dataMantenimiento.costo}
              onChange={handleInputChange}
              name='precio'
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              placeholder='$0.00'
              disabled={disabledModal}
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Habitación' />
            <FormControl fullWidth disabled={disabledModal}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Realizado por:' />
            <TextField
              defaultValue={dataMantenimiento.trabajador}
              onChange={handleInputChange}
              name='trabajador'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              placeholder='nombre'
              disabled={disabledModal}
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Reportado por:' />
            <TextField
              defaultValue={dataMantenimiento.reporta}
              onChange={handleInputChange}
              name='reporta'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              placeholder='Nombre'
              disabled={disabledModal}
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Categoría' />
            <FormControl fullWidth disabled={disabledModal}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
              onClick={sendDatos}
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

export default ModalMantenimiento;
