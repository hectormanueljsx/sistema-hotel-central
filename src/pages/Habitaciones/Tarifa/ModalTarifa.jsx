import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControl, ListItemText, Select, Checkbox } from '@mui/material';
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
  stylesButtonAlignEnd,
  stylesButtonCloseModal,
  stylesButtonSend,
  stylesCheckboxForm,
  stylesGridWrapperButtons,
  stylesGridWrapperModal,
  stylesWidthAutoButtons,
  stylesWidthHeightModal,
  stylesWrapperBoxShadow,
} from '@/pages/Habitaciones/Tarifa/TarifaStyles';

const ModalTarifa = ({ dataTarifa, handleCloseModal, dataPersonas }) => {
  const [data, setData] = useState({
    id: dataTarifa.id,
    descripcion: dataTarifa.descripcion,
    precio: dataTarifa.precio,
  });
  const [numPersonas, setNumPersonas] = useState(dataPersonas);
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointTarifa = generalEndpoints.tarifa;
  const endpointPersona = generalEndpoints.persona;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });
  const handleChangeNumPersonas = event => {
    const {
      target: { value },
    } = event;
    setNumPersonas(typeof value === 'string' ? value.split(',') : value);
  };

  const viewDisabled = event => {
    event.preventDefault();
    setDisabledModal(false);
    setDisableView(true);
  };

  const updateDatos = async event => {
    event.preventDefault();

    if (data.descripcion && data.precio && numPersonas) {
      const generalData = {
        descripcion: data.descripcion.toUpperCase(),
        precio: data.precio,
        personas: numPersonas,
      };

      setLoadingBtn(true);
      const res = await putGeneralTable(identifier, password, endpointTarifa, dataTarifa.id, generalData);
      setLoadingBtn(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Tarifa actualizada correctamente',
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
          text: 'Error al actualizar tarifa',
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

  const { list } = useGetGeneralTable(identifier, password, endpointPersona);

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Tarifa' />
      <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesButtonCloseModal}>
        <CloseIcon />
      </Button>
      <Box component='form' sx={stylesGridWrapperModal}>
        <Box component='div'>
          <TitleInput titleInput='Descripción de la tarifa' />
          <TextField
            disabled={disabledModal}
            defaultValue={dataTarifa.descripcion}
            onChange={handleInputChange}
            name='descripcion'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Precio de la tarifa' />
          <TextField
            disabled={disabledModal}
            defaultValue={dataTarifa.precio}
            onChange={handleInputChange}
            name='precio'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='No. de personas' />
          <FormControl disabled={disabledModal} fullWidth>
            <Select
              multiple
              multiline
              value={numPersonas}
              onChange={handleChangeNumPersonas}
              renderValue={selected => selected.join(', ')}
              size='small'
            >
              {list.length > 0 ? (
                list.map(name => (
                  <MenuItem key={name.id} value={name.num_persona}>
                    <Checkbox
                      checked={numPersonas.indexOf(name.num_persona) > -1}
                      disableRipple
                      sx={stylesCheckboxForm}
                    />
                    <ListItemText primary={name.num_persona} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {loadingBtn ? (
        <Box component='div' sx={stylesButtonSend}>
          <ButtonLoader />
        </Box>
      ) : (
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
              startIcon={<UpdateIcon />}
              sx={stylesWidthAutoButtons}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ModalTarifa;
