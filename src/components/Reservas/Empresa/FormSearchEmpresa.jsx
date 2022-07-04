import React, { useEffect, useState } from 'react';
import { Box, Container, TextField, Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import { historicalEndpoints } from '@/utilities/endpoints';
import getGeneralSelect from '@/services/getGeneralSelect';
import {
  stylesButtonSearch,
  stylesContainerBoxFormSearch,
  stylesContainerInputSearch,
  stylesContainerNoMargin,
  stylesContainerSection,
  stylesWidthHeightSearchForm,
} from '@/components/Reservas/Empresa/EmpresaStyle';

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
    <Container
      component='section'
      disableGutters
      sx={[stylesContainerSection, stylesContainerNoMargin, stylesWidthHeightSearchForm]}
    >
      <TitlePage titlePage='Buscar Registro' />
      <Box component='form' sx={stylesContainerBoxFormSearch}>
        <Box component='div' sx={stylesContainerInputSearch}>
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
        <Box>
          <Button
            variant='contained'
            disabled={visibleButton}
            onClick={getMoreData}
            size='large'
            startIcon={<ControlPointIcon />}
            sx={stylesButtonSearch}
          >
            {`Más de ${start} registros`}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormSearchEmpresa;
