import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import AlertGlobalForms from '@/components/AlertGlobalForms';
import postLogin from '@/services/postLogin';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Login/stylesLogin';

const Login = () => {
  const [datosLogin, setDatosLogin] = useState({
    username: '',
    password: '',
  });
  const [messageInfo, setMessageInfo] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('');
  const [openAlert, setOpenAlert] = useState(true);

  const handleInputChange = event => setDatosLogin({ ...datosLogin, [event.target.name]: event.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (datosLogin.username.trim().length > 0 && datosLogin.password.trim().length > 0) {
      const res = await postLogin(datosLogin.username, datosLogin.password);

      if (res.status >= 200 && res.status <= 299) {
        localStorage.setItem('id', res.id);
        localStorage.setItem('identifier', res.email);
        localStorage.setItem('password', datosLogin.password);
        localStorage.setItem('role', res.name);
        setOpenAlert(true);
        setMessageInfo('Inicio de sesión correcto');
        setMessageSeverity('success');
        setTimeout(() => {}, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al iniciar sesión, verifique sus datos');
        setMessageSeverity('error');
        return;
      }
    } else {
      setOpenAlert(true);
      setMessageInfo('Por favor, rellene todos los campos');
      setMessageSeverity('error');
    }
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, { width: 400 }]}>
      <CssBaseline />
      {messageInfo && (
        <AlertGlobalForms
          open={openAlert}
          setOpen={setOpenAlert}
          messageInfo={messageInfo}
          messageSeverity={messageSeverity || 'info'}
        />
      )}
      <TitlePage titlePage='Hotel Central Login' />
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
        <Button variant='contained' onClick={handleSubmit} size='large' endIcon={<LoginIcon />} sx={{ marginTop: 2 }}>
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
