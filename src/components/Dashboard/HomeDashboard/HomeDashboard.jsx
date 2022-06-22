import React from 'react';
import { Box, Container } from '@mui/material';

import ColorBarAvailables from '@/components/Dashboard/HomeDashboard/ColorBarAvailables';
import { stylesBoxHomeDashboard } from '@/components/Dashboard/HomeDashboard/HomeDashboardStyles';

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
