import React from 'react';
import { Box } from '@mui/material';

import ColorBarAvailables from '@/pages/Dashboard/HomeDashboard/ColorBarAvailables';
import { stylesWrapperGeneral, stylesWrapperInternal } from '@/pages/Dashboard/HomeDashboard/HomeDashboardStyles';

const HomeDashboard = () => {
  return (
    <Box component='section' sx={stylesWrapperGeneral}>
      <Box component='section' sx={stylesWrapperInternal}>
        <ColorBarAvailables />
      </Box>
    </Box>
  );
};

export default HomeDashboard;
