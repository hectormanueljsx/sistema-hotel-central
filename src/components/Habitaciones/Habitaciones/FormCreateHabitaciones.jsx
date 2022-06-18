import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesCheckboxForm,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Habitaciones/Habitaciones/HabitacionesStyles';

const services = ['CLIMA', 'TV'];

const FormCreateHabitaciones = () => {
  const [optionServices, setOptionServices] = useState([]);
  const [optionTarifas, setOptionTarifas] = useState([]);
  const [numHabitacion, setNumHabitacion] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointTarifa = generalEndpoints.tarifa;
  const endpointHabitacion = generalEndpoints.habitacion;
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

  const sendDatos = async event => {
    event.preventDefault();

    if (optionServices.length > 0 && optionTarifas.length > 0 && numHabitacion.trim().length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (optionTarifas.includes(list[i].descripcion)) {
          tarifaId.push(list[i].id);
        }
      }

      const HabitacionData = {
        clima: optionServices.includes('CLIMA') ? true : false,
        tv: optionServices.includes('TV') ? true : false,
        num_hab: numHabitacion,
        tarifas: tarifaId,
      };

      const res = await postGeneralTable(identifier, password, endpointHabitacion, HabitacionData);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Habitación registrada correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar habitación',
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

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointTarifa);

  return (
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Habitación' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Numero de habitación' />
          <TextField
            onChange={handleInputChangeNumHabitacion}
            variant='outlined'
            name='Habitacion'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Seleccione servicios' />
          <FormControl fullWidth>
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
                    <Checkbox checked={optionServices.indexOf(item) > -1} disableRipple sx={stylesCheckboxForm} />
                    <ListItemText primary={item} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Seleccione las tarifas permitidas' />
          <FormControl fullWidth>
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
                    <Checkbox checked={optionTarifas.indexOf(descripcion) > -1} disableRipple sx={stylesCheckboxForm} />
                    <ListItemText primary={descripcion} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={stylesButtonSend}>
          Registrar Habitación
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateHabitaciones;
