import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import putUsers from '@/services/putUsers';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

const ModalUsuario = ({ dataUsuario, setOpenAlert, setMessageInfo, setMessageSeverity }) => {
  const [data, setData] = useState({
    username: dataUsuario.username,
    password: dataUsuario.identifier,
    email: dataUsuario.email,
    confirm: dataUsuario.confirm,
  });
  const [rol, setRol] = useState('');

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.usuario;

  const handleCheckbox = e => setRol(e.target.value);
  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });

  const updateDatos = async event => {
    event.preventDefault();

    const confirmed = true;
    let dataUser = '';
    let dataRole = '';

    if (data.username === '' || data.email === '' || rol === '') {
      console.log(rol);
      setOpenAlert(true);
      setMessageInfo('Por favor, rellene todos los campos');
      setMessageSeverity('error');
      return;
    }

    if (data.password !== data.confirm) {
      setOpenAlert(true);
      setMessageInfo('Las contraseñas no coinciden');
      setMessageSeverity('error');
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

    await putUsers(identifier, password, endpoint, dataUsuario.id, dataUser, dataRole);
    setOpenAlert(true);
    setMessageInfo('Usuario actualizado correctamente');
    setMessageSeverity('success');
    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  return (
    <Container
      component='section'
      disableGutters
      sx={[stylesContainerSection, { width: 400, height: 630.25, marginTop: 0 }]}
    >
      <CssBaseline />
      <TitlePage titlePage='Actualización de Usuario' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Nombre de usuario' />
          <TextField
            defaultValue={dataUsuario.username}
            onChange={handleInputChange}
            name='username'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Nombre'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Correo Electronico' />
          <TextField
            defaultValue={dataUsuario.email}
            onChange={handleInputChange}
            name='email'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Email'
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
            placeholder='Nueva Contraseña'
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
            placeholder='Contraseña'
            required
            fullWidth
          />
        </Box>
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
          />
        </Box>
        <Button variant='contained' onClick={updateDatos} size='large' startIcon={<UpdateIcon />} sx={{ marginTop: 2 }}>
          Actualizar Usuario
        </Button>
      </Box>
    </Container>
  );
};

export default ModalUsuario;