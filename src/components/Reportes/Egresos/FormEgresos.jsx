import React from 'react';
import { Box, Button, Container, CssBaseline, FormControl, Select, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Reportes/stylesReportes';

const FormEgresos = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 586.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Reporte de Egresos' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='De fecha:' />
          <TextField variant='outlined' type='date' margin='none' size='small' required fullWidth autoFocus />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='A fecha:' />
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
        <Box component='div' sx={{ marginTop: 2 }}>
          <Button variant='contained' size='large' startIcon={<BackspaceRoundedIcon />} sx={{ marginRight: 2 }}>
            Limpiar
          </Button>
          <Button variant='contained' size='large' startIcon={<SearchRoundedIcon />}>
            Buscar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormEgresos;
