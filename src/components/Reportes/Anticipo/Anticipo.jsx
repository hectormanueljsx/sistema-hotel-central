import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormAnticipo from '@/components/Reportes/Anticipo/FormAnticipo';
import TableViewAnticipo from '@/components/Reportes/Anticipo/TableViewAnticipo';
import { stylesBoxAnticipo } from '@/components/Reportes/Anticipo/AnticipoStyles';

const Anticipo = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [dateTable, setDateTable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxAnticipo}>
        <FormAnticipo
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          setDateTable={setDateTable}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewAnticipo dataSearch={dataSearch} dateTable={dateTable} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default Anticipo;
