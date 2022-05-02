import React from 'react';
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Caja/stylesCaja';

const FormSearchHistoricoEgresos = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 250.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Buscar Registro' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Concepto' />
          <TextField
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Concepto'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Button variant='contained' size='large' startIcon={<SearchIcon />} sx={{ marginTop: 2 }}>
          Buscar Gasto
        </Button>
      </Box>
    </Container>
  );
};

export default FormSearchHistoricoEgresos;
