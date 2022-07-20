import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import LoaderImage from '@/components/Loader/LoaderImage';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/Empresa/EmpresaStyle';

const FormCreateEmpresas = () => {
  const [datos, setDatos] = useState({
    RFC: '',
    nombre: '',
    direccion: '',
    colonia: '',
    ciudad: '',
    estado: '',
    CP: '',
  });
  const [loaderRequest, setLoaderRequest] = useState(false);

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

      setLoaderRequest(true);
      const result = await postGeneralTable(identifier, password, endpointEmpresa, generalData);
      setLoaderRequest(false);

      if (result.status >= 200 && result.status <= 299) {
        Swal.fire({
          icon: 'success',
          title: 'Creación con éxito',
          text: 'El registro se ha creado con éxito',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Ah ocurrido un error',
          text: 'Lo sentimos, no se pudo crear el registro debido a un problema internamente',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        });
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
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Empresa' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
          <TitleInput titleInput='RFC' />
          <TextField
            onChange={handleInputChange}
            variant='outlined'
            name='RFC'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Nombre' />
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
        <Box component='div'>
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
        <Box component='div'>
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
        <Box component='div'>
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
        <Box component='div'>
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
        <Box component='div'>
          <TitleInput titleInput='Código postal' />
          <TextField
            onChange={handleInputChange}
            variant='outlined'
            name='CP'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
      </Box>
      <Box component='div' sx={stylesButtonSend}>
        <Button variant='contained' onClick={sendDatosEmpresa} size='large' startIcon={<SaveIcon />}>
          Registrar Empresa
        </Button>
      </Box>
    </Box>
  );
};

export default FormCreateEmpresas;
