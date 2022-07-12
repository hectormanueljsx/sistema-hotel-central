import React, { useState } from 'react';
import { Box } from '@mui/material';

import FormIngresoBruto from '@/pages/Reportes/IngresoBruto/FormIngresoBruto';
import TableViewIngresoBruto from '@/pages/Reportes/IngresoBruto/TableViewIngresoBruto';
import { stylesWrapperGeneral } from '@/pages/Reportes/IngresoBruto/IngresoBrutoStyles';

const IngresoBruto = () => {
  const [data, setData] = useState({ fechaInicio: '', fechaFin: '' });
  const [dateTable, setDateTable] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [dataPago, setDataPago] = useState([]);
  const [dataRegistro, setDataRegistro] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormIngresoBruto
        data={data}
        setDateTable={setDateTable}
        setData={setData}
        setDataSearch={setDataSearch}
        setDataPago={setDataPago}
        setDataRegistro={setDataRegistro}
        setLoading={setLoading}
        setError={setError}
      />
      <TableViewIngresoBruto
        dateTable={dateTable}
        dataSearch={dataSearch}
        dataPago={dataPago}
        dataRegistro={dataRegistro}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default IngresoBruto;
