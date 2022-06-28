import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import postGeneralTable from '@/services/postGeneralTable';
import FormSearchEmpresa from './FormSearchEmpresa';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerDoubleForm,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightFormEmpresa,
  stylesButtonSend,
} from '@/components/Reservas/Empresa/EmpresaStyle';

const FormCreateEmpresas = ({setSearch, dataEmpresa, setDataEmpresa, setLoading, setError}) => {
  const [datos, setDatos] = useState({
    RFC: '',
    nombre: '',
    direccion: '',
    colonia: '',
    ciudad: '',
    estado: '',
    CP: '',
  });

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointEmpresa = generalEndpoints.empresa;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });

  const sendDatosEmpresa = async event => {
    event.preventDefault();

    if (
      datos.RFC.trim().length > 0 &&
      datos.nombre.trim().length > 0 &&
      datos.direccion.trim().length > 0 &&
      datos.colonia.trim().length > 0 &&
      datos.ciudad.trim().length > 0 &&
      datos.estado.trim().length > 0 &&
      datos.CP.trim().length > 0
    ) {
      const generalData = {
        rfc: datos.RFC.toUpperCase(),
        nombre: datos.nombre.toUpperCase(),
        direccion: datos.direccion.toUpperCase(),
        colonia: datos.colonia.toUpperCase(),
        ciudad: datos.ciudad.toUpperCase(),
        estado: datos.estado.toUpperCase(),
        cod_p: datos.CP,
      };

      const resul = await postGeneralTable(identifier, password, endpointEmpresa, generalData);

      if (resul.status >= 200 && resul.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Empresa registrada correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar la empresa',
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
  };

  return (
    <Container component='section' disableGutters sx={stylesContainerDoubleForm}>
      <FormSearchEmpresa
        setSearch={setSearch}
        setDataEmpresa={setDataEmpresa}
        dataEmpresa={dataEmpresa}
        setLoading={setLoading}
        setError={setError}
      />
      <Container component='section' sx={[stylesContainerSection, stylesWidthHeightFormEmpresa]}>
        <TitlePage titlePage='Registro de Empresa' />
        <Box component='form' sx={stylesContainerBox}>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='RFC Empresa' />
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              name='RFC'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Nombre de la empresa' />
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              name='nombre'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Dirección' />
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              name='direccion'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Colonia' />
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              name='colonia'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Ciudad' />
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              name='ciudad'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Estado' />
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              name='estado'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Código postal' />
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              name='CP'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Button
            variant='contained'
            onClick={sendDatosEmpresa}
            size='large'
            startIcon={<SaveIcon />}
            sx={stylesButtonSend}
          >
            Registrar Empresa
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default FormCreateEmpresas;
