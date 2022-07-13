import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonAlignEnd,
  stylesButtonCloseModal,
  stylesButtonSend,
  stylesGridWrapperButtons,
  stylesGridWrapperModal,
  stylesWidthAutoButtons,
  stylesWidthHeightModal,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/Empresa/EmpresaStyle';

const ModalEmpresa = ({ selectEmpresa, handleCloseModal }) => {
  const [datos, setDatos] = useState({
    RFC: selectEmpresa.rfc,
    nombre: selectEmpresa.nombre,
    direccion: selectEmpresa.direccion,
    colonia: selectEmpresa.colonia,
    ciudad: selectEmpresa.ciudad,
    estado: selectEmpresa.estado,
    CP: selectEmpresa.cod_p,
  });
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointEmpresa = generalEndpoints.empresa;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });

  const viewDisabled = event => {
    event.preventDefault();
    setDisabledModal(false);
    setDisableView(true);
  };

  const updateEmpresa = async event => {
    event.preventDefault();

    if (
      datos.RFC.trim().length > 0 &&
      datos.nombre.trim().length > 0 &&
      datos.direccion.trim().length > 0 &&
      datos.colonia.trim().length > 0 &&
      datos.ciudad.trim().length > 0 &&
      datos.estado.trim().length > 0 &&
      datos.CP.trim().length > 0
    ) {
      const generalData = {
        rfc: datos.RFC.toUpperCase(),
        nombre: datos.nombre.toUpperCase(),
        direccion: datos.direccion.toUpperCase(),
        colonia: datos.colonia.toUpperCase(),
        ciudad: datos.ciudad.toUpperCase(),
        estado: datos.estado.toUpperCase(),
        cod_p: datos.CP,
      };

      setLoadingBtn(true);
      const resul = await putGeneralTable(identifier, password, endpointEmpresa, selectEmpresa.id, generalData);
      setLoadingBtn(false);

      if (resul.status >= 200 && resul.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Empresa actualizada correctamente',
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
          text: 'Error al actualizar empresa',
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

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Empresa' />
      <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesButtonCloseModal}>
        <CloseIcon />
      </Button>
      <Box component='form' sx={stylesGridWrapperModal}>
        <Box component='div'>
          <TitleInput titleInput='RFC' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa.rfc}
            variant='outlined'
            name='RFC'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Nombre' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa.nombre}
            variant='outlined'
            name='nombre'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Dirección' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa.direccion}
            variant='outlined'
            name='direccion'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Estado' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa.estado}
            variant='outlined'
            name='estado'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Ciudad' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa.ciudad}
            variant='outlined'
            name='ciudad'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Colonia' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa.colonia}
            variant='outlined'
            name='colonia'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Código postal' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa.cod_p}
            variant='outlined'
            name='CP'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
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
              onClick={updateEmpresa}
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

export default ModalEmpresa;
