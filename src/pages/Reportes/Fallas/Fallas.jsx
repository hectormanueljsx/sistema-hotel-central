import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import FormSearchFallas from '@/pages/Reportes/Fallas/FormSearchFallas';
import TableViewFallas from '@/pages/Reportes/Fallas/TableViewFallas';
import { stylesBoxFallas } from '@/pages/Reportes/Fallas/FallasStyles';

const Fallas = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [dateTable, setDateTable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxFallas}>
        <FormSearchFallas
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          setDateTable={setDateTable}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewFallas dataSearch={dataSearch} dateTable={dateTable} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default Fallas;
