import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia, Container, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import AlertGlobalForms from '@/components/Alert/AlertGlobalForms';
import postLogin from '@/services/postLogin';
import {
  stylesButtonSend,
  stylesContainerBox,
  stylesContainerImage,
  stylesContainerInput,
  stylesContainerSection,
  stylesIconImage,
  stylesWidthHeightForm,
} from '@/components/Login/LoginStyles';
import LogoIcon from '@/assets/favicon.png';

const Login = () => {
  const [messageInfo, setMessageInfo] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const [datosLogin, setDatosLogin] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('identifier');

    if (user) return navigate('/');
  }, []);

  const handleInputChange = event => setDatosLogin({ ...datosLogin, [event.target.name]: event.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (datosLogin.username.trim().length > 0 && datosLogin.password.trim().length > 0) {
      const res = await postLogin(datosLogin.username, datosLogin.password);

      if (res.status >= 200 && res.status <= 299) {
        localStorage.setItem('id', res.id);
        localStorage.setItem('identifier', res.email);
        localStorage.setItem('password', datosLogin.password);
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.name);
        setOpenAlert(true);
        setMessageInfo('Inicio de sesión correcto');
        setMessageSeverity('success');
        setTimeout(() => {
          navigate('/');
          location.reload();
        }, 1500);
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
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightForm]}>
      {messageInfo && (
        <AlertGlobalForms
          open={openAlert}
          setOpen={setOpenAlert}
          messageInfo={messageInfo}
          messageSeverity={messageSeverity || 'info'}
        />
      )}
      <Box component='section' sx={stylesContainerImage}>
        <CardMedia component='img' image={LogoIcon} alt='Logo Icon' sx={stylesIconImage} />
        <TitlePage titlePage='Iniciar Sesión' />
      </Box>
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
        <Button variant='contained' onClick={handleSubmit} size='large' endIcon={<LoginIcon />} sx={stylesButtonSend}>
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
