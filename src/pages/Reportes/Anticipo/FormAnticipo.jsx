import React, { useState } from 'react';
import { Box, Button, FormControl, Select, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Swal from 'sweetalert2';
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesBoxButtonsSearchMore,
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Reportes/Anticipo/AnticipoStyles';

const FormAnticipo = ({ setDataSearch, dataSearch, setDateTable, setLoading, setError }) => {
  const [data, setData] = useState({ fechaInicio: '', fechaFin: '' });
  const [formaPago, setFormaPago] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointPago = generalEndpoints.pago;
  const limit = `?fecha_gte=${data.fechaInicio}&fecha_lte=${data.fechaFin}&pago.f_pago=${formaPago}&_start=${start}`;
  const endpointAnticipo = `${generalEndpoints.anticipo}${limit}`;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });
  const handleSelectChange = event => setFormaPago(event.target.value);

  const { list } = useGetGeneralTable(identifier, password, endpointPago);

  const getMoreData = async () => {
    if (dataSearch.length >= end) {
      setVisibleButton(false);

      const resultado = await getGeneralSelect(identifier, password, endpointAnticipo);

      setDataSearch(prevData => [...prevData, ...resultado]);
      setEnd(end + 100);
      setStart(start + 100);
    } else {
      setVisibleButton(true);
    }
  };

  const getData = async () => {
    if (data.fechaInicio.length > 0 && data.fechaFin.length && formaPago) {
      try {
        setLoading(true);

        const res = await getGeneralSelect(identifier, password, endpointAnticipo);
        setDataSearch(res.data);

        if (res.status >= 200 && res.status <= 299) {
          const dateAnticipo = `${moment(data.fechaInicio).format('DD/MM/YYYY')} - ${moment(data.fechaFin).format(
            'DD/MM/YYYY',
          )}`;

          setDateTable(dateAnticipo);
          setData({ fechaInicio: '', fechaFin: '' });
          setFormaPago('');

          if (res.data.length >= end) {
            setStart(start + 100);
            setVisibleButton(false);
          } else {
            setVisibleButton(true);
          }
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
      } catch (error) {
      } finally {
        setLoading(false);
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
      <TitlePage titlePage='Buscar Anticipos por Periodo' />
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
        <Box component='div'>
          <TitleInput titleInput='Forma de pago' />
          <FormControl fullWidth>
            <Select size='small' value={formaPago} onChange={handleSelectChange}>
              {list.length > 0 ? (
                list.map(item => {
                  const { id, f_pago } = item;

                  return (
                    <MenuItem key={id} value={f_pago}>
                      {f_pago}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box component='div' sx={stylesButtonSend}>
        <Box component='div' sx={stylesBoxButtonsSearchMore}>
          <Box component='div'>
            <Button onClick={getData} variant='contained' size='large' startIcon={<SearchIcon />}>
              Buscar
            </Button>
          </Box>
          <Box component='div'>
            <Button
              variant='contained'
              disabled={visibleButton}
              onClick={getMoreData}
              size='large'
              startIcon={<ControlPointIcon />}
            >
              {`Más de ${start} registros`}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormAnticipo;
