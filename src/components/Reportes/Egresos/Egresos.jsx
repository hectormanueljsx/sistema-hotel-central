import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormEgresos from '@/components/Reportes/Egresos/FormEgresos';
import TableViewEgresos from '@/components/Reportes/Egresos/TableViewEgresos';
import { stylesBoxEgresos } from '@/components/Reportes/Egresos/EgresosStyles';

const Egresos = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [dateTable, setDateTable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxEgresos}>
        <FormEgresos
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          setDateTable={setDateTable}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewEgresos dataSearch={dataSearch} dateTable={dateTable} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default Egresos;
