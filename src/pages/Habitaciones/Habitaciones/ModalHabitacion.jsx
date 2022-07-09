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
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import putGeneralTable from '@/services/putGeneralTable';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesBoxButtons,
  stylesBoxInputs,
  stylesBoxModal,
  stylesCheckboxForm,
  stylesContainerBoxButtonAlign,
  stylesContainerInput,
  stylesContainerSection,
  stylesModalClose,
  stylesWidthHeightModal,
  stylesWidthInput,
} from '@/pages/Habitaciones/Habitaciones/HabitacionesStyles';

const ModalHabitaciones = ({ dataHabitaciones, dataSelectTarifas, dataDescription, handleCloseModal }) => {
  const [description, setDescriptions] = useState(dataDescription);
  const [optionTarifas, setOptionTarifas] = useState(dataSelectTarifas);
  const [numHabitacion, setNumHabitacion] = useState(dataHabitaciones.num_hab);
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

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
        descripcion: description,
      };

      setLoadingBtn(true);
      const res = await putGeneralTable(identifier, password, endpointHabitacion, dataHabitaciones.id, habitacionData);
      setLoadingBtn(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Habitación actualizada correctamente',
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
          text: 'Error al actualizar habitación',
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

  const { list } = useGetGeneralTable(identifier, password, endpointTarifa);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Habitación' />
      <Box component='form' sx={stylesBoxModal}>
        <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesModalClose}>
          <CloseIcon />
        </Button>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput]}>
            <TitleInput titleInput='Tarifas permitidas' />
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
                        sx={stylesCheckboxForm}
                      />
                      <ListItemText primary={descripcion} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={stylesBoxButtons}>
          {loadingBtn ? (
            <ButtonLoader />
          ) : (
            <>
              <Box component='div' sx={[stylesContainerBoxButtonAlign, stylesWidthInput]}>
                <Button
                  variant='contained'
                  disabled={disableView}
                  onClick={viewDisabled}
                  size='large'
                  startIcon={<EditIcon />}
                  sx={stylesButtonSend}
                >
                  Modificar
                </Button>
              </Box>
              <Box component='div' sx={stylesWidthInput}>
                <Button
                  variant='contained'
                  disabled={disabledModal}
                  onClick={updateDatos}
                  size='large'
                  startIcon={<UpdateIcon />}
                  sx={stylesButtonSend}
                >
                  Actualizar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ModalHabitaciones;