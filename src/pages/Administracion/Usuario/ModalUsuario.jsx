import React, { useState } from 'react';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import putUsers from '@/services/putUsers';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonAlignEnd,
  stylesButtonCloseModal,
  stylesButtonSend,
  stylesFormControlLabel,
  stylesGridWrapperButtons,
  stylesGridWrapperCheckboxsOneLine,
  stylesGridWrapperModal,
  stylesRadioButton,
  stylesWidthAutoButtons,
  stylesWidthHeightModal,
  stylesWrapperBoxShadow,
  stylesWrapperOneLine,
} from '@/pages/Administracion/Usuario/UsuarioStyles';

const ModalUsuario = ({ dataUsuario, handleCloseModal }) => {
  const [data, setData] = useState({
    username: dataUsuario.username,
    password: dataUsuario.identifier,
    email: dataUsuario.email,
    confirm: dataUsuario.confirm,
  });
  const [rol, setRol] = useState(dataUsuario.role.id);
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointUsuario = generalEndpoints.usuario;

  const handleCheckbox = e => setRol(e.target.value);
  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });

  const viewDisabled = event => {
    event.preventDefault();
    setDisabledModal(false);
    setDisableView(true);
  };

  const updateDatos = async event => {
    event.preventDefault();

    const confirmed = true;
    let dataUser = '';
    let dataRole = '';

    if (data.username === '' || data.email === '') {
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
      return;
    }

    if (data.password !== data.confirm) {
      Swal.fire({
        icon: 'error',
        text: 'Las contraseñas no coinciden',
        allowOutsideClick: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
        customClass: {
          container: 'swal-container',
        },
      });
      return;
    }

    if (data.password === '' && data.confirm === '') {
      dataUser = {
        username: data.username,
        email: data.email,
        confirmed,
      };

      dataRole = { role: { id: rol } };
    } else {
      dataUser = {
        username: data.username.toUpperCase(),
        password: data.password,
        email: data.email,
        confirmed,
      };

      dataRole = { role: { id: rol } };
    }

    setLoadingBtn(true);
    const res = await putUsers(identifier, password, endpointUsuario, dataUsuario.id, dataUser, dataRole);
    setLoadingBtn(false);

    if (res.status >= 200 && res.status <= 299) {
      Swal.fire({
        icon: 'success',
        text: 'Usuario actualizado correctamente',
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
        text: 'Error al actualizar usuario',
        allowOutsideClick: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
        customClass: {
          container: 'swal-container',
        },
      });
      return;
    }
  };

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Usuario' />
      <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesButtonCloseModal}>
        <CloseIcon />
      </Button>
      <Box component='form' sx={stylesGridWrapperModal}>
        <Box component='div'>
          <TitleInput titleInput='Nombre de usuario' />
          <TextField
            disabled={disabledModal}
            defaultValue={dataUsuario.username}
            onChange={handleInputChange}
            name='username'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Correo electrónico' />
          <TextField
            disabled={disabledModal}
            defaultValue={dataUsuario.email}
            onChange={handleInputChange}
            name='email'
            variant='outlined'
            type='email'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Contraseña' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            name='password'
            variant='outlined'
            type='password'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Confirmar contraseña' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            name='confirm'
            variant='outlined'
            type='password'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
      </Box>
      <Box component='div' sx={stylesWrapperOneLine}>
        <Box component='div'>
          <TitleInput titleInput='Selecciona un rol' />
          <Box component='div'>
            <RadioGroup
              onChange={handleCheckbox}
              defaultValue={dataUsuario.role.id}
              sx={stylesGridWrapperCheckboxsOneLine}
            >
              <FormControlLabel
                value='4'
                control={<Radio disableRipple sx={stylesRadioButton} />}
                label='Administrador'
                disabled={disabledModal}
                sx={stylesFormControlLabel}
              />
              <FormControlLabel
                value='3'
                control={<Radio disableRipple sx={stylesRadioButton} />}
                label='Recepcionista'
                disabled={disabledModal}
                sx={stylesFormControlLabel}
              />
              <FormControlLabel
                value='5'
                control={<Radio disableRipple sx={stylesRadioButton} />}
                label='Encargado'
                disabled={disabledModal}
                sx={stylesFormControlLabel}
              />
            </RadioGroup>
          </Box>
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

export default ModalUsuario;
