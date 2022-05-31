import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import putGeneralTable from '@/services/putGeneralTable';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBoxButtonAlign,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

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
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointHabitacion = generalEndpoints.habitacion;
  const endpointTarifa = generalEndpoints.tarifa;
  const tarifaId = [];

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

  const viewDisabled = event => {
    event.preventDefault();
    setDisabledModal(false);
    setDisableView(true);
  };

  const updateDatos = async event => {
    event.preventDefault();

    if (optionServices.length > 0 && optionTarifas.length > 0 && numHabitacion.trim().length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (optionTarifas.includes(list[i].descripcion)) {
          tarifaId.push(list[i].id);
        }
      }

      const habitacionData = {
        clima: optionServices.includes('CLIMA') ? true : false,
        tv: optionServices.includes('TV') ? true : false,
        num_hab: numHabitacion,
        tarifas: tarifaId,
      };

      const res = await putGeneralTable(identifier, password, endpointHabitacion, dataHabitaciones.id, habitacionData);

      if (res.status >= 200 && res.status <= 299) {
        setOpenAlert(true);
        setMessageInfo('Habitación actualizada correctamente');
        setMessageSeverity('success');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al actualizar habitación');
        setMessageSeverity('error');
        return;
      }
    } else {
      setOpenAlert(true);
      setMessageInfo('Por favor, rellene todos los campos');
      setMessageSeverity('error');
    }
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointTarifa);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 780, marginTop: 0 }]}>
      <CssBaseline />
      <TitlePage titlePage='Actualización de Habitación' />
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
            <TitleInput titleInput='Numero de Habitación' />
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
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
            <TitleInput titleInput='Servicios' />
            <FormControl disabled={disabledModal} fullWidth>
              <Select
                multiple
                value={optionServices}
                onChange={handleChangeServices}
                renderValue={selected => selected.join(', ')}
                size='small'
              >
                {services.map(item => {
                  return (
                    <MenuItem key={item} value={item}>
                      <Checkbox
                        checked={optionServices.indexOf(item) > -1}
                        disableRipple
                        sx={{ padding: 0, paddingRight: 2 }}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
            <TitleInput titleInput='Tarifas Permitidas' />
            <FormControl disabled={disabledModal} fullWidth>
              <Select
                multiple
                value={optionTarifas}
                onChange={handleChangeTarifas}
                renderValue={selected => selected.join(', ')}
                size='small'
              >
                {list.map(item => {
                  const { id, descripcion } = item;

                  return (
                    <MenuItem key={descripcion} value={descripcion} name={id}>
                      <Checkbox
                        checked={optionTarifas.indexOf(descripcion) > -1}
                        disableRipple
                        sx={{ padding: 0, paddingRight: 2 }}
                      />
                      <ListItemText primary={descripcion} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Box component='div' sx={[stylesContainerBoxButtonAlign, { width: 352 }]}>
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
          <Box component='div' sx={{ width: 352 }}>
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

export default ModalHabitaciones;
