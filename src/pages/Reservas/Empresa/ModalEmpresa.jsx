import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import LoaderImage from '@/components/Loader/LoaderImage';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonAlignEnd,
  stylesButtonCloseModal,
  stylesGridWrapperButtons,
  stylesGridWrapperModal,
  stylesWidthAutoButtons,
  stylesWidthHeightModal,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/Empresa/EmpresaStyle';

const ModalEmpresa = ({ selectEmpresa, handleCloseModal }) => {
  const [datos, setDatos] = useState({
    RFC: selectEmpresa?.rfc,
    nombre: selectEmpresa?.nombre,
    direccion: selectEmpresa?.direccion,
    colonia: selectEmpresa?.colonia,
    ciudad: selectEmpresa?.ciudad,
    estado: selectEmpresa?.estado,
    CP: selectEmpresa?.cod_p,
  });
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);
  const [loaderRequest, setLoaderRequest] = useState(false);

  const endpointEmpresa = generalEndpoints.empresa;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });

  const viewDisabled = event => {
    event.preventDefault();
    setDisabledModal(false);
    setDisableView(true);
  };

  const updateEmpresa = async event => {
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
      const result = await putGeneralTable(endpointEmpresa, selectEmpresa?.id, generalData);
      setLoaderRequest(false);

      if (result.status >= 200 && result.status <= 299) {
        Swal.fire({
          icon: 'success',
          title: 'Actualización con éxito',
          text: 'El registro se ha actualizado con éxito',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-container',
          },
        }).then(result => {
          if (result.isConfirmed) {
            handleCloseModal();
            location.reload();
          }
        });
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Ah ocurrido un error',
          text: 'Lo sentimos, no se pudo actualizar el registro debido a un problema internamente',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-container',
          },
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
        customClass: {
          container: 'swal-container',
        },
      });
    }
  };

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Empresa' />
      <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesButtonCloseModal}>
        <CloseIcon />
      </Button>
      <Box component='form' sx={stylesGridWrapperModal}>
        <Box component='div'>
          <TitleInput titleInput='RFC' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa?.rfc}
            variant='outlined'
            name='RFC'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Nombre' />
          <TextField
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa?.nombre}
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
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa?.direccion}
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
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa?.estado}
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
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa?.ciudad}
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
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa?.colonia}
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
            disabled={disabledModal}
            onChange={handleInputChange}
            defaultValue={selectEmpresa?.cod_p}
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
      <Box component='div' sx={stylesGridWrapperButtons}>
        <Box component='div' sx={stylesButtonAlignEnd}>
          <Button
            variant='contained'
            disabled={disableView}
            onClick={viewDisabled}
            size='large'
            startIcon={<EditIcon />}
            sx={stylesWidthAutoButtons}
          >
            Modificar
          </Button>
        </Box>
        <Box component='div'>
          <Button
            variant='contained'
            disabled={disabledModal}
            onClick={updateEmpresa}
            size='large'
            startIcon={<SaveIcon />}
            sx={stylesWidthAutoButtons}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalEmpresa;
