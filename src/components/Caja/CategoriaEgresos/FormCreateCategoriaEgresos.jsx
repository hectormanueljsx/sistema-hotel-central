import React from 'react';
import { Box, Button, Container, CssBaseline, FormControl, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '../../TitlePage';
import TitleInput from '../../TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '../stylesCaja';

const FormCreateCategoriaEgresos = () => {
  return (
    <Container component='section' sx={{ display: 'flex', flexDirection: 'column', width: 400 }}>
      <Container component='section' sx={[stylesContainerSection, { width: 400, height: 250.25 }]}>
        <CssBaseline />
        <TitlePage titlePage='Registro de Categoría' />
        <Box component='form' sx={stylesContainerBox}>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Nombre de la categoría' />
            <TextField
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              placeholder='Salarios'
              required
              fullWidth
              autoFocus
            />
          </Box>
          <Button variant='contained' size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
            Registrar Categoría
          </Button>
        </Box>
      </Container>
      <Container component='section' sx={[stylesContainerSection, { width: 400, height: 334.25 }]}>
        <CssBaseline />
        <TitlePage titlePage='Registro de Subcategoría' />
        <Box component='form' sx={stylesContainerBox}>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Seleccione categoría' />
            <FormControl fullWidth>
              <Select size='small'></Select>
            </FormControl>
          </Box>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Nombre de la subcategoria' />
            <TextField
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              placeholder='Recepcionista'
              required
              fullWidth
            />
          </Box>
          <Button variant='contained' size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
            Registrar Subcategoría
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default FormCreateCategoriaEgresos;