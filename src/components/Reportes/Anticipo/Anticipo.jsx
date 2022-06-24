import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormAnticipo from '@/components/Reportes/Anticipo/FormAnticipo';
import TableViewAnticipo from '@/components/Reportes/Anticipo/TableViewAnticipo';

const Anticipo = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container maxWidth='xl'>
      <Box sx={{ display: 'flex' }}>
        <FormAnticipo
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          setStatus={setStatus}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewAnticipo dataSearch={dataSearch} status={status} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default Anticipo;
