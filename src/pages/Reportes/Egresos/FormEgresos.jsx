import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Swal from 'sweetalert2';
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesBoxButtons,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthButton,
  stylesWidthHeightForm,
} from '@/pages/Reportes/Egresos/EgresosStyles';

const FormEgresos = ({ dataSearch, setDataSearch, setDateTable, setLoading, setError }) => {
  const [data, setData] = useState({ fechaInicio: '', fechaFin: '' });
  const [categoria, setCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointCategoria = generalEndpoints.categoria;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });
  const handleCategoria = event => setIdCategoria(event.target.value);
  const handleSubCategoria = event => setIdSubcategoria(event.target.value);

  useEffect(() => {
    getCategoria();
  }, []);

  const getCategoria = async () => {
    const res = await getGeneralSelect(identifier, password, endpointCategoria);
    setCategoria(res.data);
  };

  const getData = async () => {
    if (data.fechaInicio.trim().length > 0 && data.fechaFin.trim().length && idCategoria && idSubcategoria) {
      try {
        setLoading(true);

        const endpointEgreso = `egresos?fecha_gte=${data.fechaInicio}T00:00:00.000Z&fecha_lte=${data.fechaFin}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;

        const res = await getGeneralSelect(identifier, password, endpointEgreso);
        setDataSearch(res.data);

        if (res.status >= 200 && res.status <= 299) {
          const dateAnticipo = `${moment(data.fechaInicio).format('DD/MM/YYYY')} - ${moment(data.fechaFin).format(
            'DD/MM/YYYY',
          )}`;

          setDateTable(dateAnticipo);
          setData({ fechaInicio: '', fechaFin: '' });
          setIdCategoria('');
          setIdSubcategoria('');

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

  const getMoreData = async () => {
    if (dataSearch.length >= end) {
      setVisibleButton(false);

      const endpointEgreso = `egresos?fecha_gte=${data.fechaInicio}T00:00:00.000Z&fecha_lte=${data.fechaFin}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;
      const resultado = await getGeneralSelect(identifier, password, endpointEgreso);

      setDataSearch(prevData => [...prevData, ...resultado.data]);
      setEnd(end + 100);
      setStart(start + 100);
    } else {
      setVisibleButton(true);
    }
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <TitlePage titlePage='Reporte de Egresos' />
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
          <TitleInput titleInput='Categoría' />
          <FormControl fullWidth>
            <Select size='small' value={idCategoria} onChange={handleCategoria}>
              {categoria.map(item => {
                const { categoria, id, status } = item;

                return status ? (
                  <MenuItem key={id} value={item}>
                    {categoria}
                  </MenuItem>
                ) : (
                  false
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Subcategoría' />
          <FormControl fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubCategoria}>
              {idCategoria
                ? idCategoria.subcategorias.map(subitem => {
                    const { descripcion, id, status } = subitem;

                    return status ? (
                      <MenuItem key={id} value={id}>
                        {descripcion}
                      </MenuItem>
                    ) : (
                      false
                    );
                  })
                : null}
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

export default FormEgresos;
