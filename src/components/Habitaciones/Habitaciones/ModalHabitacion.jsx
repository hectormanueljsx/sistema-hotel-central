import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  FormControl,
  MenuItem,
  Select,
  ListItemText,
  Checkbox,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import putGeneralTable from '@/services/putGeneralTable';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const services = ['CLIMA', 'TV'];

const ModalHabitaciones = ({
  dataHabitaciones,
  dataSelectTarifas,
  dataServices,
  setOpenAlert,
  setMessageInfo,
  setMessageSeverity,
}) => {
  const [optionServices, setOptionServices] = useState(dataServices);
  const [optionTarifas, setOptionTarifas] = useState(dataSelectTarifas);
  const [numHabitacion, setNumHabitacion] = useState('');
  const [disabledModal, setdisabledModal] = useState(true);
  const [DisableView, setDisableView] = useState(false);
  const tarifaid = [];

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointHabitacion = generalEndpoints.habitacion;
  const endpointTarifas = generalEndpoints.tarifa;

  const handleInputChangeNumHabitacion = event => setNumHabitacion(event.target.value);

  const handleChangeServices = event => {
    const {
      target: { value },
    } = event;
    setOptionServices(typeof value === 'string' ? value.split(',') : value);
  };
  const handleChangeTarifas = event => {
    const {
      target: { value },
    } = event;
    setOptionTarifas(typeof value === 'string' ? value.split(',') : value);
  };
  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointTarifas);

  const updateDatos = async event => {
    event.preventDefault();

    if (optionServices.length > 0 && optionTarifas.length > 0 && numHabitacion.trim().length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (optionTarifas.includes(list[i].descripcion)) {
          tarifaid.push(list[i].id);
        }
      }
      const HabitacionData = {
        clima: optionServices.includes('CLIMA') ? true : false,
        tv: optionServices.includes('TV') ? true : false,
        num_hab: numHabitacion,
        tarifas: tarifaid,
      };

      const res = await putGeneralTable(identifier, password, endpointHabitacion, dataHabitaciones.id, HabitacionData);

      if (res.status >= 200 && res.status <= 299) {
        setOpenAlert(true);
        setMessageInfo('Habitacion actualizada correctamente');
        setMessageSeverity('success');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al actualizar Habitacion');
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
    <Container
      component='section'
      disableGutters
      sx={[stylesContainerSection, { width: 400, height: 418.25, marginTop: 0 }]}
    >
      <CssBaseline />
      <TitlePage titlePage='Actualización de Habitacion' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Numero de Habitacion' />
          <TextField
            disabled={disabledModal}
            defaultValue={dataHabitaciones.num_hab}
            onChange={handleInputChangeNumHabitacion}
            name='num_hab'
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
          <TitleInput titleInput='Servicios' />
          <FormControl disabled={disabledModal} sx={{ m: 1, width: 300 }}>
            <Select
              labelId='service-multiple-checkbox-label'
              id='service-multiple-checkbox'
              multiple
              value={optionServices}
              onChange={handleChangeServices}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {services.map(item => {
                return (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={optionServices.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Tarifas Permitidas' />
          <FormControl disabled={disabledModal} sx={{ m: 1, width: 300 }}>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={optionTarifas}
              onChange={handleChangeTarifas}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {list.map(item => {
                const { id, descripcion } = item;
                return (
                  <MenuItem key={descripcion} value={descripcion} name={id}>
                    <Checkbox checked={optionTarifas.indexOf(descripcion) > -1} />
                    <ListItemText primary={descripcion} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
          onClick={updateDatos}
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

export default ModalHabitaciones;
