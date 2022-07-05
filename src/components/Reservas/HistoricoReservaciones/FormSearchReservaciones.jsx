import React, { useEffect, useState } from 'react';
import { Box, Container, TextField, Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import { historicalEndpoints } from '@/utilities/endpoints';
import getGeneralSelect from '@/services/getGeneralSelect';
import {
  stylesBoxButtons,
  stylesButtonSend,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Reservas/HistoricoReservaciones/HistoricoReservacionStyles';

const FormSearchReservaciones = ({ setSearch, dataReservacion, setDataReservacion, setLoading, setError }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointReservas = historicalEndpoints.historicoReservaciones;

  useEffect(() => {
    getData();
  }, []);

  const getMoreData = async () => {
    if (dataReservacion.length >= end) {
      setVisibleButton(false);

      const resultado = await getGeneralSelect(identifier, password, `${endpointReservas}${start}`);

      setDataReservacion(prevData => [...prevData, ...resultado.data]);
      setEnd(end + 100);
      setStart(start + 100);
    } else {
      setVisibleButton(true);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);

      const result = await getGeneralSelect(identifier, password, `${endpointReservas}${start}`);
      setDataReservacion(result.data);

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
      <TitlePage titlePage='Buscar Reservación' />
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
            sx={stylesButtonSend}
          >
            {`Más de ${start} registros`}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormSearchReservaciones;
