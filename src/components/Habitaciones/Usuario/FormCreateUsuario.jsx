import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import postUsers from '@/services/postUsers';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

const FormCreateUsuario = () => {
  const [datos, setDatos] = useState({
    username: '',
    password: '',
    email: '',
    confirm: '',
  });
  const [rol, setRol] = useState('');

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.usuario;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });

  const sendDatos = async event => {
    event.preventDefault();

    const confirmed = true;
    const blocked = true;

    if (datos.password.trim() == datos.confirm.trim()) {
      if (
        datos.username.trim().length > 0 &&
        datos.password.trim().length > 0 &&
        datos.email.trim().length > 0 &&
        datos.confirm.trim().length > 0 &&
        rol
      ) {
        const dataUser = {
          username: datos.username,
          password: datos.password,
          email: datos.email,
          confirmed,
          blocked,
        };
        const dataRole = { role: { id: rol } };

        await postUsers(identifier, password, endpoint, dataUser, dataRole);
        location.reload();
      } else {
        alert('Por favor, llene todos los campos');
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 400, height: 630.25 }]}>
      <CssBaseline />
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
            placeholder='Nombre'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Correo Electronico' />
          <TextField
            onChange={handleInputChange}
            name='email'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Email'
            required
            fullWidth
            autoFocus
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
            placeholder='Contraseña'
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
            control={<Checkbox name='admin' value={'4'} onChange={e => setRol(e.target.value)} />}
            label='Administrador'
          />
          <FormControlLabel
            control={<Checkbox name='recepcion' value={'3'} onChange={e => setRol(e.target.value)} />}
            label='Recepcionista'
          />
          <FormControlLabel
            control={<Checkbox name='encargado' value={'5'} onChange={e => setRol(e.target.value)} />}
            label='Encargado'
          />
        </Box>
        <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Usuario
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateUsuario;
