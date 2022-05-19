import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField } from '@mui/material';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import putUsers from '@/services/putUsers';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Habitaciones/stylesHabitaciones';

const ModalUsuario = dataUsers => {
  const [data, setData] = useState({
    username: dataUsers.datos.username,
    password: dataUsers.datos.identifier,
    email: dataUsers.datos.email,
    confirm: dataUsers.datos.confirm,
  });
  const [rol, setRol] = useState(dataUsers.datos.role.id);

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.usuario;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });
  const handleCheckbox = e => setRol(e.target.value);

  let rolAdmin = false;
  let rolRecepcion = false;
  let rolEncargado = false;
  if (rol === 4) {
    rolAdmin = true;
  } else if (rol === 3) {
    rolRecepcion = true;
  } else if (rol == 5) {
    rolEncargado = true;
  }

  const updateDatos = async event => {
    event.preventDefault();

    const confirmed = true;
    const blocked = true;
    let dataUser = '';
    let dataRole = '';

    if (data.username && data.email && rol) {
      if (data.password) {
        if (data.password == data.confirm) {
          dataUser = {
            username: data.username,
            password: data.password,
            email: data.email,
            confirmed,
            blocked,
          };
          dataRole = { role: { id: rol } };
        } else {
          alert('Las contraseñas no coinciden');
        }
      } else {
        dataUser = {
          username: data.username,
          email: data.email,
          confirmed,
          blocked,
        };
        dataRole = { role: { id: rol } };
      }

      await putUsers(identifier, password, endpoint, dataUsers.datos.id, dataUser, dataRole);
      location.reload();
    } else {
      alert('Por favor, llene todos los campos');
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
            defaultValue={dataUsers.datos.username}
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
            defaultValue={dataUsers.datos.email}
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
            control={<Checkbox name='admin' checked={rolAdmin} value={'4'} onChange={handleCheckbox} />}
            label='Administrador'
          />
          <FormControlLabel
            control={<Checkbox name='recepcion' checked={rolRecepcion} value={'3'} onChange={handleCheckbox} />}
            label='Recepcionista'
          />
          <FormControlLabel
            control={<Checkbox name='encargado' checked={rolEncargado} value={'5'} onChange={handleCheckbox} />}
            label='Encargado'
          />
        </Box>
        <Button
          variant='contained'
          onClick={updateDatos}
          size='large'
          startIcon={<UpdateRoundedIcon />}
          sx={{ marginTop: 2 }}
        >
          Actualizar Usuario
        </Button>
      </Box>
    </Container>
  );
};

export default ModalUsuario;
