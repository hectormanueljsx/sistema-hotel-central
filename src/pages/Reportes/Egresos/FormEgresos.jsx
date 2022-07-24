import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Swal from 'sweetalert2';
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesBoxButtonsSearchMore,
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Reportes/Egresos/EgresosStyles';

const FormEgresos = ({ dataSearch, setDataSearch, setDateTable, setLoading, setError }) => {
  const [data, setData] = useState({ fechaInicio: '', fechaFin: '' });
  const [categoria, setCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const endpointCategoria = generalEndpoints.categoria;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });
  const handleCategoria = event => setIdCategoria(event.target.value);
  const handleSubCategoria = event => setIdSubcategoria(event.target.value);

  useEffect(() => {
    getCategoria();

    return () => {};
  }, []);

  const getCategoria = async () => {
    const res = await getGeneralSelect(endpointCategoria);
    setCategoria(res?.data);
  };

  const getMoreData = async () => {
    if (dataSearch?.length >= end) {
      setVisibleButton(false);

      const endpointEgreso = `egresos?fecha_gte=${data.fechaInicio}T00:00:00.000Z&fecha_lte=${data.fechaFin}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;

      const resultado = await getGeneralSelect(endpointEgreso);

      setDataSearch(prevData => [...prevData, ...resultado.data]);
      setEnd(end + 100);
      setStart(start + 100);
    } else {
      setVisibleButton(true);
    }
  };

  const getData = async () => {
    if (data.fechaInicio.trim().length > 0 && data.fechaFin.trim().length && idCategoria && idSubcategoria) {
      const endpointEgreso = `egresos?fecha_gte=${data.fechaInicio}T00:00:00.000Z&fecha_lte=${data.fechaFin}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;

      setLoading(true);
      const res = await getGeneralSelect(endpointEgreso);
      setDataSearch(res?.data);
      setLoading(false);

      if (res.status >= 200 && res.status <= 299) {
        const dateAnticipo = `${moment(data.fechaInicio).format('DD/MM/YYYY')} - ${moment(data.fechaFin).format(
          'DD/MM/YYYY',
        )}`;

        setDateTable(dateAnticipo);
        setData({ fechaInicio: '', fechaFin: '' });
        setIdCategoria('');
        setIdSubcategoria('');

        if (res?.data?.length >= end) {
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
      <TitlePage titlePage='Buscar Reporte de Egresos' />
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
          <TitleInput titleInput='Categoría' />
          <FormControl fullWidth>
            <Select size='small' value={idCategoria} onChange={handleCategoria}>
              {categoria?.length > 0 ? (
                categoria?.map(item => {
                  const { categoria, id, status } = item;

                  return status ? (
                    <MenuItem key={id} value={item}>
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
          <TitleInput titleInput='Subcategoría' />
          <FormControl fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubCategoria}>
              {idCategoria ? (
                idCategoria?.subcategorias?.length > 0 ? (
                  idCategoria?.subcategorias?.map(subitem => {
                    const { descripcion, id, status } = subitem;

                    return status ? (
                      <MenuItem key={id} value={id}>
                        {descripcion}
                      </MenuItem>
                    ) : null;
                  })
                ) : (
                  <MenuItem value=''>No se encontraron opciones</MenuItem>
                )
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

export default FormEgresos;
