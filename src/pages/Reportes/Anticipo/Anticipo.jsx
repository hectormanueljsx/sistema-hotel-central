import React, { useState } from 'react';
import { Box } from '@mui/material';

import FormAnticipo from '@/pages/Reportes/Anticipo/FormAnticipo';
import TableViewAnticipo from '@/pages/Reportes/Anticipo/TableViewAnticipo';
import { stylesWrapperGeneral } from '@/pages/Reportes/Anticipo/AnticipoStyles';

const Anticipo = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [dateTable, setDateTable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormAnticipo
        dataSearch={dataSearch}
        setDataSearch={setDataSearch}
        setDateTable={setDateTable}
        setLoading={setLoading}
        setError={setError}
      />
      <TableViewAnticipo dataSearch={dataSearch} dateTable={dateTable} loading={loading} error={error} />
    </Box>
  );
};

export default Anticipo;
