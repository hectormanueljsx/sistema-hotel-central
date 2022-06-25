import React, { useState, useEffect } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, MenuItem, Select, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import moment from 'moment';
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

const FormSearchMantenimiento = ({ setDataSearch, setDateTable, setLoading, setError, dataSearch }) => {
  const [data, setData] = useState({ firstReport: '', lastReport: '' });
  const [idCategoria, setIdCategoria] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointCategoria = generalEndpoints.categoria;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });
  const handleSubCategoria = event => setIdSubcategoria(event.target.value);

  const getSubcategoria = async () => {
    const res = await getGeneralSelect(identifier, password, `${endpointCategoria}?categoria=MANTENIMIENTO`);
    setIdCategoria(res.data[0]);
  };

  useEffect(() => {
    getSubcategoria();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      if (data.firstReport.trim().length > 0 && data.lastReport.trim().length > 0 && idSubcategoria) {
        const endpointMantenimiento = `mantenimientos?f_reporte_gte=${data.firstReport}T00:00:00.000Z&f_reporte_lte=${data.lastReport}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;

        const result = await getGeneralSelect(identifier, password, endpointMantenimiento);
        setDataSearch(result.data);

        if (result.status >= 200 && result.status <= 299) {
          const dateIngresoBruto = `${moment(data.fechaInicio).format('DD/MM/YYYY')} - ${moment(data.fechaFin).format(
            'DD/MM/YYYY',
          )}`;

          setDateTable(dateIngresoBruto);
          if (result.data.length < 1) {
            setDateTable('');
            Swal.fire({
              icon: 'error',
              text: 'No se encontraron registros',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
            return;
          } else {
            if (result.data.length >= end) {
              setStart(start + 100);
              setVisibleButton(false);
            } else {
              setVisibleButton(true);
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
      const endpointMantenimiento = `mantenimientos?f_reporte_gte=${data.firstReport}T00:00:00.000Z&f_reporte_lte=${data.lastReport}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;
      const resultado = await getGeneralSelect(identifier, password, endpointMantenimiento);
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
            value={data.firstReport}
            name='firstReport'
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
            value={data.lastReport}
            name='lastReport'
            variant='outlined'
            type='date'
            margin='none'
            size='small'
            required
            fullWidth
          />
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
          <Button variant='contained' onClick={getData} size='large' startIcon={<SearchRoundedIcon />}>
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

export default FormSearchMantenimiento;
