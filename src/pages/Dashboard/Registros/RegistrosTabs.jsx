import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import DatosRegistro from '@/pages/Dashboard/Registros/DatosRegistro/DatosRegistro';
import HistorialPago from '@/pages/Dashboard/Registros/HistorialPago/HistorialPago';
import DatosFacturacion from '@/pages/Dashboard/Registros/DatosFacturacion/DatosFacturacion';
import HistorialFactura from '@/pages/Dashboard/Registros/HistorialFactura/HistorialFactura';
import CargosExtras from '@/pages/Dashboard/Registros/CargosExtras/CargosExtras';
import {
  stylesCenteredTabs,
  stylesRemovePaddingTab,
  stylesTabs,
  stylesWidthHeightTabs,
} from '@/pages/Dashboard/Registros/RegistrosStyles';

const TabPanel = ({ children, value, index, ...rest }) => {
  return (
    <div role='tab-panel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...rest}>
      {value === index && children}
    </div>
  );
};

const a11yProps = index => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const RegistrosTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box component='section' sx={stylesWidthHeightTabs}>
      <Box component='div' sx={stylesCenteredTabs}>
        <Tabs value={value} onChange={handleChange} textColor='inherit' sx={stylesTabs}>
          <Tab sx={stylesRemovePaddingTab} label='Datos de Registro' {...a11yProps(0)} />
          <Tab sx={stylesRemovePaddingTab} label='Historial de Pago' {...a11yProps(1)} />
          <Tab sx={stylesRemovePaddingTab} label='Datos de Facturación' {...a11yProps(2)} />
          <Tab sx={stylesRemovePaddingTab} label='Historial de Factura' {...a11yProps(3)} />
          <Tab sx={stylesRemovePaddingTab} label='Cargos y Extras' {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DatosRegistro />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HistorialPago />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DatosFacturacion />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HistorialFactura />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CargosExtras />
      </TabPanel>
    </Box>
  );
};

export default RegistrosTabs;
