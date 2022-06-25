import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, Select, MenuItem, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Reportes/Anticipo/AnticipoStyles';

const FormAnticipo = ({ setDataSearch, dataSearch, setStatus, setLoading, setError }) => {
  const [data, setData] = useState({ fechaInicio: '', fechaFin: '' });
  const [formaPago, setFormaPago] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visible, setVisible] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointPago = generalEndpoints.pago;
  const limit = `?fecha_gte=${data.fechaInicio}&fecha_lte=${data.fechaFin}&pago.f_pago=${formaPago}&_start=${start}`;
  const endpointAnticipos = `${generalEndpoints.anticipo}${limit}`;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });

  const handleSelectChange = event => setFormaPago(event.target.value);

  const { list } = useGetGeneralTable(identifier, password, endpointPago);

  const cleanForm = () => {
    Array.from(document.querySelectorAll('input')).forEach(input => (input.value = ''));
    setData({ fechaInicio: '', fechaFin: '' });
    setFormaPago('');
  };

  const getMoreData = async () => {
    if (dataSearch.length >= end) {
      setVisibleButton(false);
      const resultado = await getGeneralSelect(identifier, password, endpointAnticipos);
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
        const res = await getGeneralSelect(identifier, password, endpointAnticipos);
        setDataSearch(res.data);
        setStatus(res.status);
        if (res.status >= 200 && res.status <= 299) {
          if (res.data.length >= end) {
            Swal.fire({
              icon: 'error',
              text: 'Error, no se encontraron registros',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
            return;
          } else {
            if (res.data.length >= end) {
              setStart(start + 100);
              setVisibleButton(false);
              setVisible(true);
            } else {
              setVisibleButton(true);
              setVisible(true);
            }
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
      <TitlePage titlePage='Anticipos por Periodo' />
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
        <Button
          variant='contained'
          disabled={visibleButton}
          onClick={getMoreData}
          size='large'
          startIcon={<VisibilityIcon />}
          sx={{ marginTop: 2 }}
        >
          {`Mas de ${start} Registros`}
        </Button>
      </Box>
    </Container>
  );
};

export default FormAnticipo;
