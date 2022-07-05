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
import ButtonLoader from '@/components/Loader/ButtonLoader';
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


const FormCreateHabitaciones = () => {
  const [description, setDescription] = useState('');
  const [optionTarifas, setOptionTarifas] = useState([]);
  const [numHabitacion, setNumHabitacion] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointTarifa = generalEndpoints.tarifa;
  const endpointHabitacion = generalEndpoints.habitacion;
  const tarifaId = [];

  const handleInputChangeNumHabitacion = event => setNumHabitacion(event.target.value);

  const handleChangeServices = event => setDescription(event.target.value);

  const handleChangeTarifas = event => {
    const {
      target: { value },
    } = event;
    setOptionTarifas(typeof value === 'string' ? value.split(',') : value);
  };

  const sendDatos = async event => {
    event.preventDefault();

    if (description.length > 0 && optionTarifas.length > 0 && numHabitacion.trim().length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (optionTarifas.includes(list[i].descripcion)) {
          tarifaId.push(list[i].id);
        }
      }

      const HabitacionData = {
        num_hab: numHabitacion,
        tarifas: tarifaId,
        descripcion: description,
      };

      setLoadingBtn(true);
      const res = await postGeneralTable(identifier, password, endpointHabitacion, HabitacionData);
      setLoadingBtn(false);

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

  const { list } = useGetGeneralTable(identifier, password, endpointTarifa);

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
            <TitleInput titleInput='Descripción de la Habitacion' />
            <TextField
              onChange={handleChangeServices}
              name='descripcion'
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
        {loadingBtn ? (
          <ButtonLoader />
        ) : (
          <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={stylesButtonSend}>
            Registrar Habitación
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default FormCreateHabitaciones;
