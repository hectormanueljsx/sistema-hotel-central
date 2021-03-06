import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Reportes/IngresoBruto/IngresoBrutoStyles';

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
  const limit = `?fecha_gte=${data.fechaInicio}&fecha_lte=${data.fechaFin}&_start=0`;
  const limitHistorial = `?fecha_hosp_gte=${data.fechaInicio}&fecha_hosp_lte=${data.fechaFin}&_start=0`;
  const endpointPago = generalEndpoints.pago;
  const endpointAnticipo = `${generalEndpoints.anticipo}${limit}`;
  const endpointHistorial = `${generalEndpoints.historial}${limitHistorial}`;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });

  const { list } = useGetGeneralTable(endpointPago);

  const getData = async () => {
    if (data.fechaInicio.length > 0 && data.fechaFin.length > 0) {
      setLoading(true);
      const res = await getGeneralSelect(endpointAnticipo);
      const resHistorial = await getGeneralSelect(endpointHistorial);
      setDataSearch(res?.data);
      setDataPago(list);
      setDataRegistro(resHistorial?.data);
      setLoading(false);

      if (res.status && resHistorial.status >= 200 && res.status && resHistorial.status <= 299) {
        const dateIngresoBruto = `${moment(data.fechaInicio).format('DD/MM/YYYY')} - ${moment(data.fechaFin).format(
          'DD/MM/YYYY',
        )}`;

        setDateTable(dateIngresoBruto);
        setData({ fechaInicio: '', fechaFin: '' });
      } else {
        setError(true);
        return Swal.fire({
          icon: 'error',
          title: 'Ah ocurrido un error',
          text: 'Lo sentimos, no se pudo buscar el registro debido a un problema internamente',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ah ocurrido un error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Buscar Ingresos Brutos por Periodo' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
          <TitleInput titleInput='De fecha' />
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
        <Box component='div'>
          <TitleInput titleInput='A fecha' />
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
      </Box>
      <Box component='div' sx={stylesButtonSend}>
        <Button onClick={getData} variant='contained' size='large' startIcon={<SearchIcon />}>
          Buscar Registro
        </Button>
      </Box>
    </Box>
  );
};

export default FormIngresoBruto;
