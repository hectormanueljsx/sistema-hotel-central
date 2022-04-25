import React from 'react';
import { Box, Button, Container, CssBaseline, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Reportes/stylesReportes';

const FormSearchIngresos = () => {
  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = 'egresos';
  const attribute = 'facturado';

  const params = 1;
  const { list, loading, error } = useGetSpecific(identifier, password, endpoint, attribute, params);
  console.log(list);
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400 }]}>
      <CssBaseline />
      <TitlePage titlePage='Reporte de Ingresos' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Seleccione Reporte' />
          <FormControl fullWidth>
            <Select size='small'>
              <MenuItem key='reporte1' value='ReporteIngresoBruto'>
                Reporte de ingreso Bruto
              </MenuItem>
              <MenuItem key='reporte2' value='ReporteGanancia'>
                Reporte de Ganancias
              </MenuItem>
            </Select>
          </FormControl>
          <TitleInput titleInput='Fecha Inicial' />
          <TextField
            variant='outlined'
            type='text'
            margin='none'
            placeholder='01/01/2000 00:00:00'
            size='small'
            required
            fullWidth
            autoFocus
          />
          <TitleInput titleInput='Fecha Final' />
          <TextField
            variant='outlined'
            type='text'
            margin='none'
            placeholder='01/01/2000 23:59:59'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Button variant='contained' size='large' startIcon={<SearchIcon />} sx={{ marginTop: 2 }}>
          Buscar
        </Button>
      </Box>
    </Container>
  );
};

export default FormSearchIngresos;
