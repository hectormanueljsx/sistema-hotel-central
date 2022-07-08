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
} from '@/pages/Reportes/Fallas/FallasStyles';

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
  const handleSubcategoria = event => setIdSubcategoria(event.target.value);

  useEffect(() => {
    getSubcategoria();
  }, []);

  const getSubcategoria = async () => {
    const res = await getGeneralSelect(identifier, password, `${endpointCategoria}?categoria=MANTENIMIENTO`);
    setIdCategoria(res.data[0]);
  };

  const getData = async () => {
    if (data.firstReport.trim().length > 0 && data.lastReport.trim().length > 0 && idSubcategoria) {
      try {
        setLoading(true);

        const endpointMantenimiento = `mantenimientos?f_reporte_gte=${data.firstReport}T00:00:00.000Z&f_reporte_lte=${data.lastReport}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;

        const result = await getGeneralSelect(identifier, password, endpointMantenimiento);
        setDataSearch(result.data);

        if (result.status >= 200 && result.status <= 299) {
          const dateAnticipo = `${moment(data.firstReport).format('DD/MM/YYYY')} - ${moment(data.lastReport).format(
            'DD/MM/YYYY',
          )}`;

          setDateTable(dateAnticipo);
          setData({ firstReport: '', lastReport: '' });
          setIdSubcategoria('');

          if (result.data.length === 0) {
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
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <TitlePage titlePage='Reporte de Fallas' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='De fecha' />
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
          <TitleInput titleInput='A fecha' />
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
            <Select size='small' value={idSubcategoria} onChange={handleSubcategoria}>
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
          <Button variant='contained' size='large' onClick={getData} sx={stylesWidthButton} startIcon={<SearchIcon />}>
            Buscar
          </Button>
          <Button
            variant='contained'
            size='large'
            disabled={visibleButton}
            onClick={getMoreData}
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

export default FormSearchMantenimiento;
