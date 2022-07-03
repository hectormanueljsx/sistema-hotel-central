import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import postUsers from '@/services/postUsers';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Administracion/Usuario/UsuarioStyles';

const FormCreateUsuario = () => {
  const [datos, setDatos] = useState({
    username: '',
    password: '',
    email: '',
    confirm: '',
  });
  const [rol, setRol] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointUsuario = generalEndpoints.usuario;

  const handleCheckbox = e => setRol(e.target.value);
  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });

  const sendDatos = async event => {
    event.preventDefault();

    const confirmed = true;
    const blocked = false;

    if (datos.password.trim() === datos.confirm.trim()) {
      if (
        datos.username.trim().length > 0 &&
        datos.password.trim().length > 0 &&
        datos.email.trim().length > 0 &&
        datos.confirm.trim().length > 0 &&
        rol
      ) {
        const dataUser = {
          username: datos.username.toUpperCase(),
          password: datos.password,
          email: datos.email,
          confirmed,
          blocked,
        };
        const dataRole = { role: { id: rol } };

        setLoadingBtn(true);
        const res = await postUsers(identifier, password, endpointUsuario, dataUser, dataRole);
        setLoadingBtn(false);

        if (res.status >= 200 && res.status <= 299) {
          Swal.fire({
            icon: 'success',
            text: 'Usuario registrado correctamente',
            allowOutsideClick: false,
            confirmButtonColor: '#1976d2',
            confirmButtonText: 'Aceptar',
          }).then(result => result.isConfirmed && location.reload());
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Error al registrar usuario',
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
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Las contraseñas no coinciden',
        allowOutsideClick: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Nuevo Usuario' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Nombre de usuario' />
          <TextField
            onChange={handleInputChange}
            name='username'
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
          <TitleInput titleInput='Correo electrónico' />
          <TextField
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
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Contraseña' />
          <TextField
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
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Confirmar contraseña' />
          <TextField
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
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Selecciona un rol' />
          <FormControlLabel
            control={<Checkbox name='admin' value={'4'} onChange={handleCheckbox} disableRipple />}
            label='Administrador'
          />
          <FormControlLabel
            control={<Checkbox name='recepcion' value={'3'} onChange={handleCheckbox} disableRipple />}
            label='Recepcionista'
          />
          <FormControlLabel
            control={<Checkbox name='encargado' value={'5'} onChange={handleCheckbox} disableRipple />}
            label='Encargado'
          />
        </Box>
        {loadingBtn ? (
          <ButtonLoader />
        ) : (
          <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={stylesButtonSend}>
            Registrar Usuario
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default FormCreateUsuario;
