import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import { historicalEndpoints } from '@/utilities/endpoints';
import getGeneralSelect from '@/services/getGeneralSelect';
import {
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Reportes/HabitacionSaldoPendiente/HabitacionSaldoPendienteStyles';

const FormSearchSaldoPendiente = ({ setSearch, dataHistorico, setDataHistorico, setLoading, setError }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const endpointHistorico = historicalEndpoints.historicoHistorial;

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const getMoreData = async () => {
    if (dataHistorico?.length >= end) {
      setVisibleButton(false);

      const result = await getGeneralSelect(`${endpointHistorico}${start}`);

      setDataHistorico(prevData => [...prevData, ...result?.data]);
      setEnd(end + 100);
      setStart(start + 100);
    } else {
      setVisibleButton(true);
    }
  };

  const getData = async () => {
    setLoading(true);
    const result = await getGeneralSelect(`${endpointHistorico}${start}`);
    setDataHistorico(result?.data);
    setLoading(false);

    if (result.status >= 200 && result.status <= 299) {
      if (result?.data?.length >= end) {
        setStart(start + 100);
        setVisibleButton(false);
      } else {
        setVisibleButton(true);
      }
    } else {
      setError(result);
    }
  };

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Buscar Registro' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
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
      </Box>
      <Box component='div' sx={stylesButtonSend}>
        <Button
          variant='contained'
          disabled={visibleButton}
          onClick={getMoreData}
          size='large'
          startIcon={<ControlPointIcon />}
        >
          {`M??s de ${start} registros`}
        </Button>
      </Box>
    </Box>
  );
};

export default FormSearchSaldoPendiente;
