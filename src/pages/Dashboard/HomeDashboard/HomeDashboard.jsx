import React from 'react';
import { Box, Container } from '@mui/material';

import ColorBarAvailables from '@/pages/Dashboard/HomeDashboard/ColorBarAvailables';
import { stylesBoxHomeDashboard } from '@/pages/Dashboard/HomeDashboard/HomeDashboardStyles';

const HomeDashboard = () => {
  return (
    <Container component='section' disableGutters maxWidth='xl'>
      <Box sx={stylesBoxHomeDashboard}>
        <ColorBarAvailables />
      </Box>
    </Container>
  );
};

export default HomeDashboard;
