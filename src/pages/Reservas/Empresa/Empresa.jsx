import React, { useState } from 'react';
import { Box } from '@mui/material';

import FormCreateEmpresas from '@/pages/Reservas/Empresa/FormCreateEmpresas';
import FormSearchEmpresa from '@/pages/Reservas/Empresa/FormSearchEmpresa';
import TableViewEmpresas from '@/pages/Reservas/Empresa/TableViewEmpresas';
import { stylesWrapperGeneral, stylesWrapperInternal } from '@/pages/Reservas/Empresa/EmpresaStyle';

const Empresa = () => {
  const [search, setSearch] = useState('');
  const [dataEmpresa, setDataEmpresa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <FormCreateEmpresas />
      <Box component='div' sx={stylesWrapperInternal}>
        <FormSearchEmpresa
          setSearch={setSearch}
          setDataEmpresa={setDataEmpresa}
          dataEmpresa={dataEmpresa}
          setLoading={setLoading}
          setError={setError}
        />
        <TableViewEmpresas search={search} dataEmpresa={dataEmpresa} loading={loading} error={error} />
      </Box>
    </Box>
  );
};

export default Empresa;
