import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import LoaderImage from '@/components/Loader/LoaderImage';
import { generalEndpoints } from '@/utilities/endpoints';
import postLogin from '@/services/postLogin';
import putGeneralTable from '@/services/putGeneralTable';
import {
  stylesBoxImage,
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesIconImage,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
  stylesWrapperGeneral,
} from '@/pages/Login/LoginStyles';
import Logo from '@/assets/favicon.png';

const Login = () => {
  const [datosLogin, setDatosLogin] = useState({
    username: '',
    password: '',
  });
  const [loaderRequest, setLoaderRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) return navigate('/');

    return () => {};
  }, []);

  const handleInputChange = event => setDatosLogin({ ...datosLogin, [event.target.name]: event.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (datosLogin.username.trim().length > 0 && datosLogin.password.trim().length > 0) {
      try {
        setLoaderRequest(true);
        const res = await postLogin(datosLogin.username, datosLogin.password);
        const dateTime = new Date();

        if (res.status >= 200 && res.status <= 299) {
          const endpointUsuario = generalEndpoints.usuario;
          const generalData = { ult_ingreso: dateTime.toISOString() };

          localStorage.setItem('id', res.id);
          localStorage.setItem('jwt', res.jwt);
          localStorage.setItem('username', res.username);
          localStorage.setItem('role', res.name);

          await putGeneralTable(endpointUsuario, res.id, generalData);

          navigate('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ah ocurrido un error',
            text: 'Por favor, verifique su usuario y contraseña',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#1976d2',
            confirmButtonText: 'Aceptar',
          });
        }
      } catch (error) {
      } finally {
        setLoaderRequest(false);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ah ocurrido un error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
        <Box component='div' sx={stylesBoxImage}>
          <CardMedia component='img' image={Logo} alt='Logo Icon' sx={stylesIconImage} />
          <TitlePage titlePage='Iniciar Sesión' />
        </Box>
        <Box component='form' sx={stylesGridWrapperForm}>
          <Box component='div'>
            <TitleInput titleInput='Correo electrónico' />
            <TextField
              onChange={handleInputChange}
              name='username'
              variant='outlined'
              type='email'
              margin='none'
              size='small'
              required
              fullWidth
              autoFocus
            />
          </Box>
          <Box component='div'>
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
        </Box>
        <Box component='div' sx={stylesButtonSend}>
          <Button variant='contained' onClick={handleSubmit} size='large' endIcon={<LoginIcon />}>
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
