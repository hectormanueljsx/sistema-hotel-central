import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';

import AlertGlobalForms from '@/components/Alert/AlertGlobalForms';
import FormCreateEgresos from '@/components/Caja/Egresos/FormCreateEgresos';
import TableViewEgresos from '@/components/Caja/Egresos/TableViewEgresos';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesBoxEgresos } from '@/components/Caja/Egresos/EgresosStyles';

const Egresos = () => {
  const [messageInfo, setMessageInfo] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const [pago, setPago] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointPago = generalEndpoints.pago;
  const endpointCategoria = generalEndpoints.categoria;

  const getPago = async () => {
    const res = await getGeneralSelect(identifier, password, endpointPago);
    setPago(res.data);
  };

  const getCategoria = async () => {
    const res = await getGeneralSelect(identifier, password, endpointCategoria);
    setCategoria(res.data);
  };

  useEffect(() => {
    getPago();
    getCategoria();
  }, []);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      {messageInfo && (
        <AlertGlobalForms
          open={openAlert}
          setOpen={setOpenAlert}
          messageInfo={messageInfo}
          messageSeverity={messageSeverity || 'info'}
        />
      )}
      <Box sx={stylesBoxEgresos}>
        <FormCreateEgresos
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
          pago={pago}
          categoria={categoria}
        />
        <TableViewEgresos
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
          pago={pago}
          categoria={categoria}
        />
      </Box>
    </Container>
  );
};

export default Egresos;
