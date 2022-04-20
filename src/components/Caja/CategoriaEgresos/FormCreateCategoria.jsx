import React from 'react';
import { Box, Button, Container, CssBaseline, FormControl, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TitlePage from '../../TitlePage';
import TitleInput from '../../TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '../stylesCaja';

const FormCreateCategoria = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400 }]}>
      <CssBaseline />
      <TitlePage titlePage='Alta de Categoría' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Categoría' />
          <TextField
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Ejemplo: SALARIOS'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Button variant='contained' size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2, marginBottom: 2 }}>
          Registrar Categoría
        </Button>
        <TitlePage titlePage='Alta de SubCategoría' />
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Seleccione Categoría' />
          <FormControl fullWidth>
            <Select size='small'></Select>
          </FormControl>
          <TitleInput titleInput='SubCategoria' />
          <TextField
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Ejemplo:  RECEPCIONISTA'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Button variant='contained' size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar SubCategoría
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateCategoria;
