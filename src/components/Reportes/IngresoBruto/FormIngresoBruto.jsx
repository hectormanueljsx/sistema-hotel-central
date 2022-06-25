import React from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesBoxButtons,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Reportes/IngresoBruto/IngresoBrutoStyles';

const FormIngresoBruto = ({
  data,
  setDateTable,
  setData,
  setDataSearch,
  setDataPago,
  setDataRegistro,
  setLoading,
  setError,
}) => {
  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const limit = `?fecha_gte=${data.fechaInicio}&fecha_lte=${data.fechaFin}&_start=0`;
  const limitHistorial = `?fecha_hosp_gte=${data.fechaInicio}&fecha_hosp_lte=${data.fechaFin}&_start=0`;
  const endpointPago = generalEndpoints.pago;
  const endpointAnticipo = `${generalEndpoints.anticipo}${limit}`;
  const endpointHistorial = `${generalEndpoints.historial}${limitHistorial}`;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });

  const { list } = useGetGeneralTable(identifier, password, endpointPago);

  const getData = async () => {
    if (data.fechaInicio.length > 0 && data.fechaFin.length) {
      try {
        setLoading(true);

        const res = await getGeneralSelect(identifier, password, endpointAnticipo);
        const resHistorial = await getGeneralSelect(identifier, password, endpointHistorial);

        setDataSearch(res.data);
        setDataPago(list);
        setDataRegistro(resHistorial.data);

        if (res.status && resHistorial.status >= 200 && res.status && resHistorial.status <= 299) {
          const dateIngresoBruto = `${moment(data.fechaInicio).format('DD/MM/YYYY')} - ${moment(data.fechaFin).format(
            'DD/MM/YYYY',
          )}`;

          setDateTable(dateIngresoBruto);
          setData({ fechaInicio: '', fechaFin: '' });

          if (res.data.length === 0) {
            setDateTable('');
            Swal.fire({
              icon: 'error',
              text: 'No se encontraron registros',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
            return;
          }
        } else {
          setError(true);
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
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <TitlePage titlePage='Selecciona el Periodo' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='De fecha:' />
          <TextField
            name='fechaInicio'
            value={data.fechaInicio}
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
            value={data.fechaFin}
            onChange={handleInputChange}
            variant='outlined'
            type='date'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesBoxButtons}>
          <Button onClick={getData} variant='contained' size='large' startIcon={<SearchIcon />}>
            Buscar Registro
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormIngresoBruto;
