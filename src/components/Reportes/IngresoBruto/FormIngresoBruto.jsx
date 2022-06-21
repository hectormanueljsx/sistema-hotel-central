import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, Select, MenuItem, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Reportes/IngresoBruto/IngresoBrutoStyles';

const FormIngresoBruto = ({ setDataSearch, setStatus, setLoading, setError, setDataPago, setDataRegistro }) => {
  const [data, setData] = useState({ fechaInicio: '', fechaFin: '' });

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointPago = generalEndpoints.pago;
  const limit = `?fecha_gte=${data.fechaInicio}&fecha_lte=${data.fechaFin}&_start=0`;
  const limitHistorial = `?fecha_hosp_gte=${data.fechaInicio}&fecha_hosp_lte=${data.fechaFin}&_start=0`;
  const endpointAnticipos = `${generalEndpoints.anticipo}${limit}`;
  const endpointHistorial = `${generalEndpoints.historial}${limitHistorial}`;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });

  const { list } = useGetGeneralTable(identifier, password, endpointPago);

  const cleanForm = () => {
    Array.from(document.querySelectorAll('input')).forEach(input => (input.value = ''));
    setData({ fechaInicio: '', fechaFin: '' });
  };
  const getData = async () => {
    if (data.fechaInicio.length > 0 && data.fechaFin.length) {
      try {
        setLoading(true);
        const res = await getGeneralSelect(identifier, password, endpointAnticipos);
        const resHistorial = await getGeneralSelect(identifier, password, endpointHistorial);
        setDataRegistro(resHistorial.data);
        setDataSearch(res.data);
        setDataPago(list);
        setStatus(res.status);
        if (res.status >= 200 && res.status <= 299) {
          if (res.data.length < 1) {
            Swal.fire({
              icon: 'error',
              text: 'Error, no se encontraron registros',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
            return;
          } else {
            Swal.fire({
              icon: 'success',
              text: 'Registros encontrados correctamente',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Error al buscar registros',
            allowOutsideClick: false,
            confirmButtonColor: '#1976d2',
            confirmButtonText: 'Aceptar',
          });
          return;
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
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

  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 418.25 }]}>
      <CssBaseline />
      <TitlePage titlePage='Selecciona el periodo' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='De fecha:' />
          <TextField
            name='fechaInicio'
            onChange={handleInputChange}
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
          <TitleInput titleInput='A fecha:' />
          <TextField
            name='fechaFin'
            onChange={handleInputChange}
            variant='outlined'
            type='date'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={{ marginTop: 2 }}>
          <Button
            onClick={cleanForm}
            variant='contained'
            size='large'
            startIcon={<BackspaceRoundedIcon />}
            sx={{ marginRight: 2 }}
          >
            Limpiar
          </Button>
          <Button onClick={getData} variant='contained' size='large' startIcon={<SearchRoundedIcon />}>
            Buscar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormIngresoBruto;
