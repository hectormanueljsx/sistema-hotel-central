import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  MenuItem,
  Select,
  TextField,
  ListItemText,
  Checkbox,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import postGeneralTable from '@/services/postGeneralTable';
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

const FormCreateHabitaciones = ({ setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [optionServices, setOptionServices] = useState([]);
  const [optionTarifas, setOptionTarifas] = useState([]);
  const [numHabitacion, setNumHabitacion] = useState('');
  const tarifaid = [];

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpointTarifas = generalEndpoints.tarifa;
  const endpointHabitacion = generalEndpoints.habitacion;

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

  const sendDatos = async event => {
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

      const res = await postGeneralTable(identifier, password, endpointHabitacion, HabitacionData);
      if (res.status >= 200 && res.status <= 299) {
        setOpenAlert(true);
        setMessageInfo('Tarifa registrada correctamente');
        setMessageSeverity('success');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al registrar tarifa');
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
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 500.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Habitacion' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Numero de Habitacion' />
          <TextField
            onChange={handleInputChangeNumHabitacion}
            variant='outlined'
            name='Habitacion'
            type='text'
            margin='none'
            size='small'
            placeholder='1'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Seleccione Servicios' />
          <FormControl sx={{ m: 1, width: 300 }}>
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
          <TitleInput titleInput='Seleccione las Tarifas permitidas' />
          <FormControl sx={{ m: 1, width: 300 }}>
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
        <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Habitacion
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateHabitaciones;
