import React, { useEffect, useState } from 'react';
import { Box, Container, TextField, Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import { historicalEndpoints } from '@/utilities/endpoints';
import getGeneralSelect from '@/services/getGeneralSelect';
import {
  stylesBoxButtons,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/pages/Caja/HistoricoEgresos/HistoricoEgresosStyles';

const FormSearchHistoricoEgresos = ({ setSearch, dataEgreso, setDataEgreso, setLoading, setError }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointEgresos = historicalEndpoints.historicoEgresos;

  useEffect(() => {
    getData();
  }, []);

  const getMoreData = async () => {
    if (dataEgreso.length >= end) {
      setVisibleButton(false);

      const resultado = await getGeneralSelect(identifier, password, `${endpointEgresos}${start}`);

      setDataEgreso(prevData => [...prevData, ...resultado.data]);
      setEnd(end + 100);
      setStart(start + 100);
    } else {
      setVisibleButton(true);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);

      const result = await getGeneralSelect(identifier, password, `${endpointEgresos}${start}`);
      setDataEgreso(result.data);

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
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <TitlePage titlePage='Buscar Registro' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Buscar' />
          <TextField
            onChange={e => setSearch(e.target.value)}
            name='concepto'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesBoxButtons}>
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
    </Container>
  );
};

export default FormSearchHistoricoEgresos;
