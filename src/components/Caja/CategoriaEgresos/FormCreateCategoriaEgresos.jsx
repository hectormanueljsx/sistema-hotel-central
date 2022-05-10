import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerDoubleForm,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Caja/stylesCaja';

const FormCreateCategoriaEgresos = () => {
  const [options, setOptions] = useState('');

  const handleChange = event => {
    setOptions(event.target.value);
  };

  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpoint = generalEndpoints.categoria;

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpoint);

  return (
    <Container component='section' disableGutters sx={stylesContainerDoubleForm}>
      <CssBaseline />
      <Container component='section' sx={[stylesContainerSection, { height: 250.25 }]}>
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
      <Container component='section' sx={[stylesContainerSection, { height: 334.25 }]}>
        <TitlePage titlePage='Registro de Subcategoría' />
        <Box component='form' sx={stylesContainerBox}>
          <Box component='div' sx={stylesContainerInput}>
            <TitleInput titleInput='Seleccione categoría' />
            <FormControl fullWidth>
              <Select size='small' value={options} onChange={handleChange}>
                {list.map((item, index) => {
                  const { categoria } = item;

                  return (
                    <MenuItem key={index} value={categoria}>
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
