import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import FormSearchMantenimiento from '@/components/Reportes/Fallas/FormSearchMantenimiento';
import TableViewMantenimiento from '@/components/Reportes/Fallas/TableViewMantenimiento';

const Mantenimiento = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [dateTable, setDateTable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <FormSearchMantenimiento
          setDataSearch={setDataSearch}
          setDateTable={setDateTable}
          setLoading={setLoading}
          setError={setError}
          dataSearch={dataSearch}
        />
        <TableViewMantenimiento dataSearch={dataSearch} dateTable={dateTable} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default Mantenimiento;
