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
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Reportes/stylesReportes';
import putGeneralTable from '@/services/putGeneralTable';

const ModalMantenimiento = ({
  setOpenAlert,
  setMessageInfo,
  setMessageSeverity,
  habitacion,
  subcategoria,
  dataMantenimiento,
}) => {
  const [datos, setDatos] = useState({
    fechaInicio: dataMantenimiento.f_inicio,
    fechafin: dataMantenimiento.f_fin,
    motivo: dataMantenimiento.motivo,
    precio: dataMantenimiento.costo,
  });
  const [idHabitacion, setIdHabitacion] = useState(dataMantenimiento.habitacion.id);
  const [idSubcategoria, setIdSubcategoria] = useState(dataMantenimiento.subcategoria.id);
  const [estado, setEstado] = useState(dataMantenimiento.estado);
  const [disabledModal, setdisabledModal] = useState(true);
  const [DisableView, setDisableView] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');

  const endpointMantenimiento = generalEndpoints.mantenimiento;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });
  const handleHabitacion = event => setIdHabitacion(event.target.value);
  const handleSubcategoria = event => setIdSubcategoria(event.target.value);
  const handleCheckbox = e => setEstado(e.target.checked);

  const sendDatos = async event => {
    event.preventDefault();

    if (datos.motivo && datos.precio && datos.fechaInicio && idHabitacion && idSubcategoria) {
      const generalData = {
        f_inicio: datos.fechaInicio,
        f_fin: datos.fechafin,
        motivo: datos.motivo.toUpperCase(),
        estado,
        costo: datos.precio,
        habitacion: { id: idHabitacion },
        subcategoria: { id: idSubcategoria },
      };
      console.log(generalData);
      const res = await putGeneralTable(identifier, password, endpointMantenimiento, dataMantenimiento.id, generalData);

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

  const viewDisabled = event => {
    event.preventDefault();
    setdisabledModal(false);
    setDisableView(true);
  };
  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 400, height: 743.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Nuevo Mantenimiento' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Motivo del Mantenimiento' />
          <TextField
            defaultValue={dataMantenimiento.motivo}
            onChange={handleInputChange}
            name='motivo'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='construcción'
            disabled={disabledModal}
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Fecha de Inicio' />
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
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Fecha de Termino' />
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
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
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
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Estatus' />
          <FormControlLabel
            disabled={disabledModal}
            control={
              <Checkbox
                name='estado'
                defaultChecked={dataMantenimiento.estado ? true : false}
                onChange={handleCheckbox}
                disableRipple
                sx={{ padding: 0, paddingLeft: 1 }}
              />
            }
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Habitacion' />
          <FormControl fullWidth disabled={disabledModal}>
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
          <FormControl fullWidth disabled={disabledModal}>
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
        <Box component='div' sx={stylesContainerInput}>
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
            autoFocus
          />
        </Box>
        <Button
          variant='contained'
          disabled={DisableView}
          onClick={viewDisabled}
          size='large'
          startIcon={<EditIcon />}
          sx={{ marginTop: 2 }}
        >
          Modificar Mantenimiento
        </Button>
        <Button
          variant='contained'
          disabled={disabledModal}
          onClick={sendDatos}
          size='large'
          startIcon={<UpdateIcon />}
          sx={{ marginTop: 2 }}
        >
          Actualizar Mantenimiento
        </Button>
      </Box>
    </Container>
  );
};

export default ModalMantenimiento;
