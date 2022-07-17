import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import DatosRegistro from '@/pages/Dashboard/Registros/DatosRegistro/DatosRegistro';
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
        <DatosRegistro />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DatosRegistro />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DatosRegistro />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DatosRegistro />
      </TabPanel>
    </Box>
  );
};

export default RegistrosTabs;
