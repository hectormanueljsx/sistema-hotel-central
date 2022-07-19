import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import LoaderImage from '@/components/Loader/LoaderImage';
import putGeneralTable from '@/services/putGeneralTable';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonAlignEnd,
  stylesButtonCloseModal,
  stylesCheckboxForm,
  stylesGridWrapperButtons,
  stylesGridWrapperModal,
  stylesWidthAutoButtons,
  stylesWidthHeightModal,
  stylesWrapperBoxShadow,
  stylesWrapperOneLine,
} from '@/pages/Habitaciones/Habitaciones/HabitacionesStyles';

const ModalHabitaciones = ({ dataHabitaciones, dataSelectTarifas, dataDescription, handleCloseModal }) => {
  const [description, setDescriptions] = useState(dataDescription);
  const [optionTarifas, setOptionTarifas] = useState(dataSelectTarifas);
  const [numHabitacion, setNumHabitacion] = useState(dataHabitaciones.num_hab);
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);
  const [loaderRequest, setLoaderRequest] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointHabitacion = generalEndpoints.habitacion;
  const endpointTarifa = generalEndpoints.tarifa;
  const tarifaId = [];

  const handleInputChangeNumHabitacion = event => setNumHabitacion(event.target.value);
  const handleChangeDescription = event => setDescriptions(event.target.value);

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

    if (description && optionTarifas && numHabitacion) {
      for (let i = 0; i < list.length; i++) {
        if (optionTarifas.includes(list[i].descripcion)) {
          tarifaId.push(list[i].id);
        }
      }
      const habitacionData = {
        num_hab: numHabitacion,
        tarifas: tarifaId,
        descripcion: description.toUpperCase(),
      };

      setLoaderRequest(true);
      const res = await putGeneralTable(identifier, password, endpointHabitacion, dataHabitaciones.id, habitacionData);
      setLoaderRequest(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          title: 'Actualización con éxito',
          text: 'El registro se ha actualizado con éxito',
          allowOutsideClick: false,
          allowEscapeKey: false,
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
          title: 'Ah ocurrido un error',
          text: 'Lo sentimos, no se pudo actualizar el registro debido a un problema internamente',
          allowOutsideClick: false,
          allowEscapeKey: false,
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
        title: 'Ah ocurrido un error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
        customClass: {
          container: 'swal-container',
        },
      });
    }
  };

  const { list } = useGetGeneralTable(identifier, password, endpointTarifa);

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Habitación' />
      <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesButtonCloseModal}>
        <CloseIcon />
      </Button>
      <Box component='form' sx={stylesGridWrapperModal}>
        <Box component='div'>
          <TitleInput titleInput='No. de habitación' />
          <TextField
            disabled={disabledModal}
            defaultValue={dataHabitaciones.num_hab}
            onChange={handleInputChangeNumHabitacion}
            name='num_hab'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Descripción de la habitación' />
          <TextField
            disabled={disabledModal}
            defaultValue={dataHabitaciones.descripcion}
            onChange={handleChangeDescription}
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
      </Box>
      <Box component='div' sx={stylesWrapperOneLine}>
        <Box component='div'>
          <TitleInput titleInput='Tarifas permitidas' />
          <FormControl disabled={disabledModal} fullWidth>
            <Select
              multiple
              value={optionTarifas}
              onChange={handleChangeTarifas}
              renderValue={selected => selected.join(', ')}
              size='small'
            >
              {list.length > 0 ? (
                list.map(item => {
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
            onClick={updateDatos}
            size='large'
            startIcon={<SaveIcon />}
            sx={stylesWidthAutoButtons}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalHabitaciones;
