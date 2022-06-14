import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';

import AlertGlobalForms from '@/components/Alert/AlertGlobalForms';
import FormCreateMantenimiento from '@/components/Reportes/Mantenimiento/FormCreateMantenimiento';
import TableViewMantenimiento from '@/components/Reportes/Mantenimiento/TableViewMantenimiento';
import getGeneralSelect from '@/services/getGeneralSelect';
import getSpecificSelect from '@/services/getSpecificSelect';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesBoxMantenimiento } from '@/components/Reportes/Mantenimiento/MantenimientoStyles';

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

  const getHabitacion = async () => {
    const res = await getGeneralSelect(identifier, password, endpointHabitacion);
    setHabitacion(res.data);
  };

  const getCategoria = async () => {
    const res = await getSpecificSelect(identifier, password, endpointCategoria, attribute, valueAttribute);
    const { subcategorias } = res.data[0];
    setSubcategoria(subcategorias);
  };

  useEffect(() => {
    getHabitacion();
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
      <Box sx={stylesBoxMantenimiento}>
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
