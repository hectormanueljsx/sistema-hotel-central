import React, { useState, useEffect } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Reportes/Egresos/EgresosStyles';
// pendiente la condicion si viene mas de 100 datos

const FormEgresos = ({ setDataSearch, setLoading, setError, dataSearch }) => {
  const [data, setData] = useState({ fechaInicio: '', fechaFin: '' });
  const [categoria, setCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visible, setVisible] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointCategoria = generalEndpoints.categoria;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });
  const handleCategoria = event => setIdCategoria(event.target.value);
  const handleSubCategoria = event => setIdSubcategoria(event.target.value);

  const getCategoria = async () => {
    const res = await getGeneralSelect(identifier, password, endpointCategoria);
    setCategoria(res.data);
  };

  useEffect(() => {
    getCategoria();
  }, []);

  const cleanForm = () => {
    Array.from(document.querySelectorAll('input')).forEach(input => (input.value = ''));
    setData({ fechaInicio: '', fechaFin: '' });
    setIdCategoria('');
  };

  const getData = async () => {
    try {
      setLoading(true);
      if (data.fechaInicio.trim().length > 0 && data.fechaFin.trim().length && idCategoria && idSubcategoria) {
        const endpointEgreso = `egresos?fecha_gte=${data.fechaInicio}T00:00:00.000Z&fecha_lte=${data.fechaFin}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;

        const res = await getGeneralSelect(identifier, password, endpointEgreso);
        setDataSearch(res.data);
        if (res.status >= 200 && res.status <= 299) {
          if (res.data.length < 1) {
            Swal.fire({
              icon: 'error',
              text: 'No se encontraron registros',
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
              text: 'Registro encontrado correctamente',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            }).then(result => result.isConfirmed);
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
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Por favor, rellene todos los campos',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const moreData = async () => {
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
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <CssBaseline />
      <TitlePage titlePage='Reporte de Egresos' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='De fecha:' />
          <TextField
            onChange={handleInputChange}
            name='fechaInicio'
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
            onChange={handleInputChange}
            name='fechaFin'
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
                const { categoria, id } = item;
                return (
                  <MenuItem key={id} value={item}>
                    {categoria}
                  </MenuItem>
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
                    const { descripcion, id } = subitem;
                    return (
                      <MenuItem key={id} value={id}>
                        {descripcion}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <Button
            variant='contained'
            onClick={cleanForm}
            size='large'
            startIcon={<BackspaceRoundedIcon />}
            sx={{ marginRight: 2 }}
          >
            Limpiar
          </Button>
          <Button
            variant='contained'
            onClick={getData}
            disabled={visible}
            size='large'
            startIcon={<SearchRoundedIcon />}
          >
            Buscar
          </Button>
          <Button
            variant='contained'
            disabled={visibleButton}
            onClick={moreData}
            size='large'
            startIcon={<SearchRoundedIcon />}
          >
            {`Mas de ${start} Registros`}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormEgresos;
