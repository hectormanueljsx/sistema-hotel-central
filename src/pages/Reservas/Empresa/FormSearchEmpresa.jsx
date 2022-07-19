import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import { historicalEndpoints } from '@/utilities/endpoints';
import getGeneralSelect from '@/services/getGeneralSelect';
import {
  stylesBoxFormSearch,
  stylesButtonMaxContent,
  stylesButtonSearch,
  stylesInputWidthAuto,
  stylesWidthHeightSearch,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/Empresa/EmpresaStyle';

const FormSearchEmpresa = ({ setSearch, dataEmpresa, setDataEmpresa, setLoading, setError }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointEmpresa = historicalEndpoints.historicoEmpresa;

  useEffect(() => {
    getData();
  }, []);

  const getMoreData = async () => {
    if (dataEmpresa.length >= end) {
      setVisibleButton(false);

      const resultado = await getGeneralSelect(identifier, password, `${endpointEmpresa}${start}`);

      setDataEmpresa(prevData => [...prevData, ...resultado.data]);
      setEnd(end + 100);
      setStart(start + 100);
    } else {
      setVisibleButton(true);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);

      const result = await getGeneralSelect(identifier, password, `${endpointEmpresa}${start}`);
      setDataEmpresa(result.data);

      if (result.data.length >= end) {
        setStart(start + 100);
        setVisibleButton(false);
      } else {
        setVisibleButton(true);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightSearch]}>
      <TitlePage titlePage='Buscar Empresa' />
      <Box component='form' sx={stylesBoxFormSearch}>
        <Box component='div' sx={stylesInputWidthAuto}>
          <TitleInput titleInput='Buscar' />
          <TextField
            onChange={e => setSearch(e.target.value)}
            name='nombre'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesButtonSearch}>
          <Button
            variant='contained'
            disabled={visibleButton}
            onClick={getMoreData}
            size='large'
            startIcon={<ControlPointIcon />}
            sx={stylesButtonMaxContent}
          >
            {`Más de ${start} registros`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormSearchEmpresa;
