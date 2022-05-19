import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerDoubleForm,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Caja/stylesCaja';

const FormCreateCategoriaEgresos = ({ setOpenAlert, setMessageError, setMessageSuccess }) => {
  const [categoria, setCategoria] = useState('');
  const [options, setOptions] = useState('');
  const [subcategoria, setSubcategoria] = useState('');

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpointCategory = generalEndpoints.categoria;
  const endpointSubcategory = generalEndpoints.subcategoria;

  const handleChange = event => setOptions(event.target.value);

  const handleInputChangeCategoria = event => setCategoria(event.target.value);

  const handleInputChangeSubcategoria = event => setSubcategoria(event.target.value);

  const sendDatosCategoria = async event => {
    event.preventDefault();

    if (categoria.trim().length > 0) {
      const categoryData = { categoria: categoria.toUpperCase() };

      await postGeneralTable(identifier, password, endpointCategory, categoryData);
      setOpenAlert(true);
      setMessageSuccess('Categoria registrada correctamente');
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      setOpenAlert(true);
      setMessageError('Por favor, rellene el campo de categoria');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  };

  const sendDatosSubcategoria = async event => {
    event.preventDefault();

    if (options && subcategoria.trim().length > 0) {
      const subcategoryData = {
        descripcion: subcategoria.toUpperCase(),
        categoria: { id: options },
      };

      await postGeneralTable(identifier, password, endpointSubcategory, subcategoryData);
      setOpenAlert(true);
      setMessageSuccess('Subcategoria registrada correctamente');
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      setOpenAlert(true);
      setMessageError('Por favor, seleccione una categoria y/o rellene el campo de subcategoria');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointCategory);

  return (
    <Container component='section' disableGutters sx={stylesContainerDoubleForm}>
      <CssBaseline />
      <Container component='section' sx={[stylesContainerSection, { height: 250.25 }]}>
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
              placeholder='Salarios'
              required
              fullWidth
              autoFocus
            />
          </Box>
          <Button
            variant='contained'
            onClick={sendDatosCategoria}
            size='large'
            startIcon={<SaveIcon />}
            sx={{ marginTop: 2 }}
          >
            Registrar Categoría
          </Button>
        </Box>
      </Container>
      <Container component='section' sx={[stylesContainerSection, { height: 334.25, marginTop: 5 }]}>
        <TitlePage titlePage='Registro de Subcategoría' />
        <Box component='form' sx={stylesContainerBox}>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Seleccione categoría' />
            <FormControl fullWidth>
              <Select size='small' value={options} onChange={handleChange}>
                {list.map((item, index) => {
                  const { categoria, id } = item;

                  return (
                    <MenuItem key={index} value={id}>
                      {categoria}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Nombre de la subcategoria' />
            <TextField
              onChange={handleInputChangeSubcategoria}
              variant='outlined'
              name='subcategoria'
              type='text'
              margin='none'
              size='small'
              placeholder='Recepcionista'
              required
              fullWidth
            />
          </Box>
          <Button
            variant='contained'
            onClick={sendDatosSubcategoria}
            size='large'
            startIcon={<SaveIcon />}
            sx={{ marginTop: 2 }}
          >
            Registrar Subcategoría
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default FormCreateCategoriaEgresos;
