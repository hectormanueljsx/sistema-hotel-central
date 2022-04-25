import React from 'react';
import { Box, Button, Container, CssBaseline, FormControl, Select, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';

import TitlePage from '../../TitlePage';
import TitleInput from '../../TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '../stylesReporte';

const FormConsultEgresos = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 652.02 }]}>
      <CssBaseline />
      <TitlePage titlePage='Reporte de Egresos' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='De Fecha:' />
          <TextField
            variant='outlined'
            type='date'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='A Fecha:' />
          <TextField variant='outlined' type='date' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Categoría' />
          <FormControl fullWidth>
            <Select size='small'></Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Subcategoría' />
          <FormControl fullWidth>
            <Select size='small'></Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Forma de pago' />
          <FormControl fullWidth>
            <Select size='small'></Select>
          </FormControl>
        </Box>
        <Button variant='contained' size='large' startIcon={<BackspaceRoundedIcon />} sx={{ marginTop: 2 }}>
          Borrar Filtros
        </Button>
        <Button variant='contained' size='large' startIcon={<SearchRoundedIcon />} sx={{ marginTop: 2 }}>
          Buscar
        </Button>
      </Box>
    </Container>
  );
};

export default FormConsultEgresos;
