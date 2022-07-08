import React, { useState } from 'react';
import { Box, Button, Container, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerDoubleForm,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightFormCategoria,
  stylesWidthHeightFormSubcategoria,
  stylesButtonSend,
} from '@/pages/Caja/CategoriaEgresos/CategoriaEgresosStyles';

const FormCreateCategoriaEgresos = () => {
  const [categoria, setCategoria] = useState('');
  const [options, setOptions] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [loadingBtnCategoria, setLoadingBtnCategoria] = useState(false);
  const [loadingBtnSubcategoria, setLoadingBtnSubcategoria] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointCategoria = generalEndpoints.categoria;
  const endpointSubcategoria = generalEndpoints.subcategoria;

  const handleChange = event => setOptions(event.target.value);
  const handleInputChangeCategoria = event => setCategoria(event.target.value);
  const handleInputChangeSubcategoria = event => setSubcategoria(event.target.value);

  const sendDatosCategoria = async event => {
    event.preventDefault();

    if (categoria.trim().length > 0) {
      const categoryData = { categoria: categoria.toUpperCase() };

      setLoadingBtnCategoria(true);
      const res = await postGeneralTable(identifier, password, endpointCategoria, categoryData);
      setLoadingBtnCategoria(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Categoría registrada correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar categoría',
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

  const sendDatosSubcategoria = async event => {
    event.preventDefault();

    if (options && subcategoria.trim().length > 0) {
      const subcategoryData = {
        descripcion: subcategoria.toUpperCase(),
        categoria: { id: options },
      };

      setLoadingBtnSubcategoria(true);
      const res = await postGeneralTable(identifier, password, endpointSubcategoria, subcategoryData);
      setLoadingBtnSubcategoria(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Subcategoría registrada correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar subcategoría',
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

  const { list } = useGetGeneralTable(identifier, password, endpointCategoria);

  return (
    <Container component='section' disableGutters sx={stylesContainerDoubleForm}>
      <Container component='section' sx={[stylesContainerSection, stylesWidthHeightFormCategoria]}>
        <TitlePage titlePage='Registro de Categoría' />
        <Box component='form' sx={stylesContainerBox}>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Nombre de la categoría' />
            <TextField
              onChange={handleInputChangeCategoria}
              variant='outlined'
              name='categoria'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
              autoFocus
            />
          </Box>
          {loadingBtnCategoria ? (
            <ButtonLoader />
          ) : (
            <Button
              variant='contained'
              onClick={sendDatosCategoria}
              size='large'
              startIcon={<SaveIcon />}
              sx={stylesButtonSend}
            >
              Registrar Categoría
            </Button>
          )}
        </Box>
      </Container>
      <Container component='section' sx={[stylesContainerSection, stylesWidthHeightFormSubcategoria]}>
        <TitlePage titlePage='Registro de Subcategoría' />
        <Box component='form' sx={stylesContainerBox}>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Seleccione categoría' />
            <FormControl fullWidth>
              <Select size='small' value={options} onChange={handleChange}>
                {list.map(item => {
                  const { categoria, id, status } = item;

                  return status ? (
                    <MenuItem key={id} value={id}>
                      {categoria}
                    </MenuItem>
                  ) : (
                    false
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Nombre de la subcategoría' />
            <TextField
              onChange={handleInputChangeSubcategoria}
              variant='outlined'
              name='subcategoria'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          {loadingBtnSubcategoria ? (
            <ButtonLoader />
          ) : (
            <Button
              variant='contained'
              onClick={sendDatosSubcategoria}
              size='large'
              startIcon={<SaveIcon />}
              sx={stylesButtonSend}
            >
              Registrar Subcategoría
            </Button>
          )}
        </Box>
      </Container>
    </Container>
  );
};

export default FormCreateCategoriaEgresos;
