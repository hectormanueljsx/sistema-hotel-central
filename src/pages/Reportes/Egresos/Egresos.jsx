import React, { useState } from 'react';
import { Box } from '@mui/material';

import FormEgresos from '@/pages/Reportes/Egresos/FormEgresos';
import TableViewEgresos from '@/pages/Reportes/Egresos/TableViewEgresos';
import { stylesWrapperGeneral } from '@/pages/Reportes/Egresos/EgresosStyles';

const Egresos = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [dateTable, setDateTable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormEgresos
        dataSearch={dataSearch}
        setDataSearch={setDataSearch}
        setDateTable={setDateTable}
        setLoading={setLoading}
        setError={setError}
      />
      <TableViewEgresos dataSearch={dataSearch} dateTable={dateTable} loading={loading} error={error} />
    </Box>
  );
};

export default Egresos;
