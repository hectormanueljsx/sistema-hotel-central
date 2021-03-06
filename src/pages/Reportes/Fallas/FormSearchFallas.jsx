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
} from '@/pages/Reportes/Fallas/FallasStyles';

const FormSearchMantenimiento = ({ setDataSearch, setDateTable, setLoading, setError, dataSearch }) => {
  const [data, setData] = useState({ firstReport: '', lastReport: '' });
  const [idCategoria, setIdCategoria] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const endpointCategoria = generalEndpoints.categoria;

  const handleInputChange = event => setData({ ...data, [event.target.name]: event.target.value });
  const handleSubcategoria = event => setIdSubcategoria(event.target.value);

  useEffect(() => {
    getSubcategoria();

    return () => {};
  }, []);

  const getSubcategoria = async () => {
    const res = await getGeneralSelect(`${endpointCategoria}?categoria=MANTENIMIENTO`);
    setIdCategoria(res?.data[0]);
  };

  const getMoreData = async () => {
    if (dataSearch?.length >= end) {
      const endpointMantenimiento = `mantenimientos?f_reporte_gte=${data.firstReport}T00:00:00.000Z&f_reporte_lte=${data.lastReport}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;

      setVisibleButton(false);
      const result = await getGeneralSelect(endpointMantenimiento);
      setDataSearch(prevData => [...prevData, ...result?.data]);
      setEnd(end + 100);
      setStart(start + 100);
    } else {
      setVisibleButton(true);
    }
  };

  const getData = async () => {
    if (data.firstReport.trim().length > 0 && data.lastReport.trim().length > 0 && idSubcategoria) {
      const endpointMantenimiento = `mantenimientos?f_reporte_gte=${data.firstReport}T00:00:00.000Z&f_reporte_lte=${data.lastReport}T23:59:59.000Z&subcategoria=${idSubcategoria}:DESC&_start=${start}`;

      setLoading(true);
      const result = await getGeneralSelect(endpointMantenimiento);
      setDataSearch(result?.data);
      setLoading(false);

      if (result.status >= 200 && result.status <= 299) {
        const dateAnticipo = `${moment(data.firstReport).format('DD/MM/YYYY')} - ${moment(data.lastReport).format(
          'DD/MM/YYYY',
        )}`;

        setDateTable(dateAnticipo);
        setData({ firstReport: '', lastReport: '' });
        setIdSubcategoria('');

        if (result?.data?.length >= end) {
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
      <TitlePage titlePage='Buscar Reporte de Fallas' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
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
        <Box component='div'>
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
        <Box component='div'>
          <TitleInput titleInput='Subcategor??a' />
          <FormControl fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubcategoria}>
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
            <Button variant='contained' size='large' onClick={getData} startIcon={<SearchIcon />}>
              Buscar
            </Button>
          </Box>
          <Box component='div'>
            <Button
              variant='contained'
              size='large'
              disabled={visibleButton}
              onClick={getMoreData}
              startIcon={<ControlPointIcon />}
            >
              {`M??s de ${start} registros`}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormSearchMantenimiento;
