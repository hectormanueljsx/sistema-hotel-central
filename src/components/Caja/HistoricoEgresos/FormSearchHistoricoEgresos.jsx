import React, { useState } from 'react';
import { Box, Container, CssBaseline, TextField, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import { historicalEndpoints } from '@/utilities/endpoints';
import getGeneralSelect from '@/services/getGeneralSelect';
import {
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Caja/HistoricoEgresos/HistoricoEgresosStyles';

const FormSearchHistoricoEgresos = ({ setSearch, setDataEgreso, setLoading, setError, dataEgreso }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [visible, setVisible] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointEgreso = historicalEndpoints.historicoEgresos;

  const getMoreData = async () => {
    if (dataEgreso.length > end) {
      setVisibleButton(false);

      const resultado = await getGeneralSelect(identifier, password, `${endpointEgreso}${start}`);

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

      const result = await getGeneralSelect(identifier, password, `${endpointEgreso}${start}`);
      setDataEgreso(result.data);

      if (result.data.length > end) {
        setStart(start + 100);
        setVisibleButton(false);
        setVisible(true);
      } else {
        setVisibleButton(true);
        setVisible(true);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <CssBaseline />
      <TitlePage titlePage='Buscar Registro' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Buscar/Encontrar' />
          <TextField
            onChange={e => setSearch(e.target.value)}
            name='concepto'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Concepto'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Button
          variant='contained'
          disabled={visible}
          onClick={getData}
          size='large'
          startIcon={<VisibilityIcon />}
          sx={{ marginTop: 2 }}
        >
          {`ver Registros`}
        </Button>
        <Button
          variant='contained'
          disabled={visibleButton}
          onClick={getMoreData}
          size='large'
          startIcon={<VisibilityIcon />}
          sx={{ marginTop: 2 }}
        >
          {`Mas de ${start} Registros`}
        </Button>
      </Box>
    </Container>
  );
};

export default FormSearchHistoricoEgresos;
