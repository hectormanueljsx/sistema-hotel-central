import React, { useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Caja/CategoriaEgresos/CategoriaEgresosStyles';

const FormCreateSubcategoriaEgresos = () => {
  const [options, setOptions] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [loadingBtnSubcategoria, setLoadingBtnSubcategoria] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointCategoria = generalEndpoints.categoria;
  const endpointSubcategoria = generalEndpoints.subcategoria;

  const handleChange = event => setOptions(event.target.value);
  const handleInputChangeSubcategoria = event => setSubcategoria(event.target.value);

  const sendDatosSubcategoria = async event => {
    event.preventDefault();

    if (options && subcategoria.trim().length > 0) {
      const subcategoryData = {
        descripcion: subcategoria.toUpperCase(),
        categoria: { id: options },
      };

      setLoadingBtnSubcategoria(true);
      const res = await postGeneralTable(identifier, password, endpointSubcategoria, subcategoryData);
      setLoadingBtnSubcategoria(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Subcategoría registrada correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar subcategoría',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const { list } = useGetGeneralTable(identifier, password, endpointCategoria);

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Subcategoría' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
          <TitleInput titleInput='Seleccione categoría' />
          <FormControl fullWidth>
            <Select size='small' value={options} onChange={handleChange}>
              {list.length > 0 ? (
                list.map(item => {
                  const { categoria, id, status } = item;

                  return status ? (
                    <MenuItem key={id} value={id}>
                      {categoria}
                    </MenuItem>
                  ) : null;
                })
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Nombre de la subcategoría' />
          <TextField
            onChange={handleInputChangeSubcategoria}
            variant='outlined'
            name='subcategoria'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
      </Box>
      {loadingBtnSubcategoria ? (
        <Box component='div' sx={stylesButtonSend}>
          <ButtonLoader />
        </Box>
      ) : (
        <Box component='div' sx={stylesButtonSend}>
          <Button variant='contained' onClick={sendDatosSubcategoria} size='large' startIcon={<SaveIcon />}>
            Registrar Subcategoría
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FormCreateSubcategoriaEgresos;
