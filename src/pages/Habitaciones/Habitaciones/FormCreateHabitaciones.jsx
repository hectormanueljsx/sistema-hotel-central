import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import LoaderImage from '@/components/Loader/LoaderImage';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesCheckboxForm,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Habitaciones/Habitaciones/HabitacionesStyles';

const FormCreateHabitaciones = () => {
  const [description, setDescription] = useState('');
  const [optionTarifas, setOptionTarifas] = useState([]);
  const [numHabitacion, setNumHabitacion] = useState('');
  const [loaderRequest, setLoaderRequest] = useState(false);

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
        descripcion: description.toUpperCase(),
      };

      setLoaderRequest(true);
      const res = await postGeneralTable(endpointHabitacion, HabitacionData);
      setLoaderRequest(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          title: 'Creaci??n con ??xito',
          text: 'El registro se ha creado con ??xito',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Ah ocurrido un error',
          text: 'Lo sentimos, no se pudo crear el registro debido a un problema internamente',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ah ocurrido un error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const { list } = useGetGeneralTable(endpointTarifa);

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Habitaci??n' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
          <TitleInput titleInput='No. de habitaci??n' />
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
        <Box component='div'>
          <TitleInput titleInput='Descripci??n de la habitaci??n' />
          <TextField
            onChange={handleChangeServices}
            name='descripcion'
            variant='outlined'
            type='text'
            multiline
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Seleccione las tarifas permitidas' />
          <FormControl fullWidth>
            <Select
              multiple
              value={optionTarifas}
              onChange={handleChangeTarifas}
              renderValue={selected => selected.join(', ')}
              size='small'
            >
              {list?.length > 0 ? (
                list?.map(item => {
                  const { id, descripcion, status } = item;

                  return status ? (
                    <MenuItem key={descripcion} value={descripcion} name={id}>
                      <Checkbox
                        checked={optionTarifas.indexOf(descripcion) > -1}
                        disableRipple
                        sx={stylesCheckboxForm}
                      />
                      <ListItemText primary={descripcion} />
                    </MenuItem>
                  ) : null;
                })
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box component='div' sx={stylesButtonSend}>
        <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />}>
          Registrar Habitaci??n
        </Button>
      </Box>
    </Box>
  );
};

export default FormCreateHabitaciones;
