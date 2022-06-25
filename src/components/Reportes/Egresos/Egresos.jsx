import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormEgresos from '@/components/Reportes/Egresos/FormEgresos';
import TableViewEgresos from '@/components/Reportes/Egresos/TableViewEgresos';

const Egresos = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormEgresos
          setDataSearch={setDataSearch}
          setLoading={setLoading}
          setError={setError}
          dataSearch={dataSearch}
        />
        <TableViewEgresos dataSearch={dataSearch} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default Egresos;
