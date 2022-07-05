import React, { useState } from 'react';
import { Box, Button, Container, FormControl, Select, MenuItem, TextField } from '@mui/material';
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
  stylesBoxButtons,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthButton,
  stylesWidthHeightForm,
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

          if (res.data.length >= end) {
            setStart(start + 100);
            setVisibleButton(false);
          } else {
            setVisibleButton(true);
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
      <TitlePage titlePage='Anticipos por Periodo' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
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
        <Box component='div' sx={stylesContainerInput}>
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
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Forma de pago' />
          <FormControl fullWidth>
            <Select size='small' value={formaPago} onChange={handleSelectChange}>
              {list.map(item => {
                const { id, f_pago } = item;

                return (
                  <MenuItem key={id} value={f_pago}>
                    {f_pago}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesBoxButtons}>
          <Button onClick={getData} variant='contained' size='large' sx={stylesWidthButton} startIcon={<SearchIcon />}>
            Buscar
          </Button>
          <Button
            variant='contained'
            disabled={visibleButton}
            onClick={getMoreData}
            size='large'
            sx={stylesWidthButton}
            startIcon={<ControlPointIcon />}
          >
            {`Más de ${start} registros`}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormAnticipo;
