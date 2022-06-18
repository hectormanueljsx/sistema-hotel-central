import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import putUsers from '@/services/putUsers';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesBoxButtons,
  stylesBoxInputs,
  stylesBoxModal,
  stylesContainerBoxButtonAlign,
  stylesContainerInput,
  stylesContainerSection,
  stylesModalClose,
  stylesWidthHeightModal,
  stylesWidthInput,
} from '@/components/Administracion/Usuario/UsuarioStyles';

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
        username: data.username,
        password: data.password,
        email: data.email,
        confirmed,
      };

      dataRole = { role: { id: rol } };
    }

    const res = await putUsers(identifier, password, endpointUsuario, dataUsuario.id, dataUser, dataRole);

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
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Usuario' />
      <Box component='form' sx={stylesBoxModal}>
        <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesModalClose}>
          <CloseIcon />
        </Button>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Selecciona un rol' />
            <FormControlLabel
              control={
                <Checkbox
                  name='admin'
                  defaultChecked={dataUsuario.role.id === 4 ? true : false}
                  value={'4'}
                  onChange={handleCheckbox}
                />
              }
              label='Administrador'
              disabled={disabledModal}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='recepcion'
                  defaultChecked={dataUsuario.role.id === 3 ? true : false}
                  value={'3'}
                  onChange={handleCheckbox}
                />
              }
              label='Recepcionista'
              disabled={disabledModal}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='encargado'
                  defaultChecked={dataUsuario.role.id === 5 ? true : false}
                  value={'5'}
                  onChange={handleCheckbox}
                />
              }
              label='Encargado'
              disabled={disabledModal}
            />
          </Box>
        </Box>
        <Box sx={stylesBoxButtons}>
          <Box component='div' sx={[stylesContainerBoxButtonAlign, stylesWidthInput]}>
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
          <Box component='div' sx={stylesWidthInput}>
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

export default ModalUsuario;
