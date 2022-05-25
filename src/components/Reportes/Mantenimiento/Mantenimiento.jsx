import React, { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import AlertGlobalForms from '@/components/AlertGlobalForms';
import FormCreateMantenimiento from '@/components/Reportes/Mantenimiento/FormCreateMantenimiento';
import TableViewMantenimiento from '@/components/Reportes/Mantenimiento/TableViewMantenimiento';
import getGeneralSelect from '@/services/getGeneralSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import getSpecificSelect from '@/services/getSpecificSelect';

const Mantenimiento = () => {
  const [messageInfo, setMessageInfo] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('');
  const [openAlert, setOpenAlert] = useState(true);

  const [habitacion, setHabitacion] = useState([]);
  const [subcategoria, setSubcategoria] = useState([]);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');

  const endpointHabitacion = generalEndpoints.habitacion;
  const endpointCategoria = generalEndpoints.categoria;
  const attribute = 'categoria';
  const valueAttribute = 'MANTENIMIENTO';

  async function getHabitacion() {
    await getGeneralSelect(identifier, password, endpointHabitacion).then(res => {
      setHabitacion(res.data);
    });
  }
  document.addEventListener('DOMContentLoaded', getHabitacion, false);

  async function getCategoria() {
    await getSpecificSelect(identifier, password, endpointCategoria, attribute, valueAttribute).then(result => {
      const { subcategorias } = result.data[0];
      setSubcategoria(subcategorias);
    });
  }
  document.addEventListener('DOMContentLoaded', getCategoria, false);

  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <CssBaseline />
      {messageInfo && (
        <AlertGlobalForms
          open={openAlert}
          setOpen={setOpenAlert}
          messageInfo={messageInfo}
          messageSeverity={messageSeverity || 'info'}
        />
      )}
      <Box sx={{ display: 'flex' }}>
        <FormCreateMantenimiento
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
          habitacion={habitacion}
          subcategoria={subcategoria}
        />
        <TableViewMantenimiento
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setMessageSeverity={setMessageSeverity}
          habitacion={habitacion}
          subcategoria={subcategoria}
        />
      </Box>
    </Container>
  );
};

export default Mantenimiento;
