import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Select,
  TextField,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Caja/stylesCaja';

const FormCreateEgresos = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 655.02 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Gasto' />
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
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Importe' />
          <TextField variant='outlined' type='text' margin='none' size='small' placeholder='$0.00' required fullWidth />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Con factura' />
          <FormControlLabel control={<Checkbox disableRipple sx={{ padding: 0, paddingLeft: 1 }} />} />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Forma de pago' />
          <FormControl fullWidth>
            <Select size='small'></Select>
          </FormControl>
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
        <Button variant='contained' size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Gasto
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateEgresos;
