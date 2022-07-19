import React, { useState } from 'react';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import LoaderImageModal from '@/components/Loader/LoaderImageModal';
import putUsers from '@/services/putUsers';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonAlignEnd,
  stylesButtonCloseModal,
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
  const [loaderRequest, setLoaderRequest] = useState(false);

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

    if (data.username.trim() === '' || data.email.trim() === '') {
      return Swal.fire({
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

    if (data.password !== data.confirm) {
      return Swal.fire({
        icon: 'error',
        title: 'Ah ocurrido un error',
        text: 'Por favor, verifique que las contraseñas coincidan',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
        customClass: {
          container: 'swal-container',
        },
      });
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

    setLoaderRequest(true);
    const res = await putUsers(identifier, password, endpointUsuario, dataUsuario.id, dataUser, dataRole);
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
      return Swal.fire({
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
    }
  };

  if (loaderRequest) {
    return <LoaderImageModal />;
  }

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

export default ModalUsuario;
