import React from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Select,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TitlePage from '../../TitlePage';
import TitleInput from '../../TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '../stylesCaja';
import useGetGeneralTable from '../../../hooks/useGetGeneralTable';

const FormCreateGasto = () => {
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400 }]}>
      <CssBaseline />
      <TitlePage titlePage='Registrar Gasto' />
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
          <FormControlLabel control={<Checkbox />} label='Con Factura' />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Forma de Pago' />
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
          Registrar
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateGasto;
