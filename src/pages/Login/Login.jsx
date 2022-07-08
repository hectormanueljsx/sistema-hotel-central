import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia, Container, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import { generalEndpoints } from '@/utilities/endpoints';
import postLogin from '@/services/postLogin';
import putGeneralTable from '@/services/putGeneralTable';
import {
  stylesButtonSend,
  stylesContainerBox,
  stylesContainerImage,
  stylesContainerInput,
  stylesContainerSection,
  stylesIconImage,
  stylesWidthHeightForm,
} from '@/pages/Login/LoginStyles';
import LogoIcon from '@/assets/favicon.png';

const Login = () => {
  const [datosLogin, setDatosLogin] = useState({
    username: '',
    password: '',
  });
  const [loadingBtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('identifier');

    if (user) return navigate('/');
  }, []);

  const handleInputChange = event => setDatosLogin({ ...datosLogin, [event.target.name]: event.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (datosLogin.username.trim().length > 0 && datosLogin.password.trim().length > 0) {
      try {
        setLoadingBtn(true);
        const res = await postLogin(datosLogin.username, datosLogin.password);
        const dateTime = new Date();

        if (res.status >= 200 && res.status <= 299) {
          const endpointUsuario = generalEndpoints.usuario;
          const generalData = { ult_ingreso: dateTime.toISOString() };

          await putGeneralTable(res.email, datosLogin.password, endpointUsuario, res.id, generalData);

          localStorage.setItem('id', res.id);
          localStorage.setItem('identifier', res.email);
          localStorage.setItem('password', datosLogin.password);
          localStorage.setItem('username', res.username);
          localStorage.setItem('role', res.name);

          Swal.fire({
            icon: 'success',
            text: 'Inicio de sesión correcto',
            allowOutsideClick: false,
            confirmButtonColor: '#1976d2',
            confirmButtonText: 'Aceptar',
          }).then(result => navigate('/'));
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Error al iniciar sesión, verifique sus datos',
            allowOutsideClick: false,
            confirmButtonColor: '#1976d2',
            confirmButtonText: 'Aceptar',
          });
        }
      } catch (error) {
      } finally {
        setLoadingBtn(false);
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
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <Box component='section' sx={stylesContainerImage}>
        <CardMedia component='img' image={LogoIcon} alt='Logo Icon' sx={stylesIconImage} />
        <TitlePage titlePage='Iniciar Sesión' />
      </Box>
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
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
        {loadingBtn ? (
          <ButtonLoader />
        ) : (
          <Button variant='contained' onClick={handleSubmit} size='large' endIcon={<LoginIcon />} sx={stylesButtonSend}>
            Iniciar Sesión
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Login;
