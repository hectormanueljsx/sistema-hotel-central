import React from 'react';
import { Box, Typography } from '@mui/material';

import TitlePage from '@/components/Title/TitlePage';
import {
  stylesBackgroundHeaderAvailable,
  stylesColorBloqueado,
  stylesColorBloqueadoConfirmar,
  stylesColorCheckout,
  stylesColorDisponible,
  stylesColorOcupado,
  stylesColorOcupadoPorConfirmar,
  stylesColorReservado,
  stylesColorReservadoPorConfirmar,
  stylesGridWrapperPaletteColors,
  stylesTextTitleAvailable,
  stylesWidthHeightColor,
  stylesWidthHeightPaletteColors,
  stylesWrapperBoxShadow,
} from '@/pages/Dashboard/HomeDashboard/HomeDashboardStyles';

const ColorBarAvailables = () => {
  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightPaletteColors]}>
      <TitlePage titlePage='Código de Colores Usados para el Estado de las Habitaciones' />
      <Box component='div' sx={stylesGridWrapperPaletteColors}>
        <Box component='div'>
          <Box component='div' sx={stylesBackgroundHeaderAvailable}>
            <Typography component='p' sx={stylesTextTitleAvailable}>
              Ocupado
            </Typography>
          </Box>
          <Box component='div' sx={[stylesColorOcupado, stylesWidthHeightColor]}></Box>
        </Box>
        <Box component='div'>
          <Box component='div' sx={stylesBackgroundHeaderAvailable}>
            <Typography component='p' sx={stylesTextTitleAvailable}>
              Disponible
            </Typography>
          </Box>
          <Box component='div' sx={[stylesColorDisponible, stylesWidthHeightColor]}></Box>
        </Box>
        <Box component='div'>
          <Box component='div' sx={stylesBackgroundHeaderAvailable}>
            <Typography component='p' sx={stylesTextTitleAvailable}>
              Reservado
            </Typography>
          </Box>
          <Box component='div' sx={[stylesColorReservado, stylesWidthHeightColor]}></Box>
        </Box>
        <Box component='div'>
          <Box component='div' sx={stylesBackgroundHeaderAvailable}>
            <Typography component='p' sx={stylesTextTitleAvailable}>
              Ocupado por confirmar
            </Typography>
          </Box>
          <Box component='div' sx={[stylesColorOcupadoPorConfirmar, stylesWidthHeightColor]}></Box>
        </Box>
        <Box component='div'>
          <Box component='div' sx={stylesBackgroundHeaderAvailable}>
            <Typography component='p' sx={stylesTextTitleAvailable}>
              Reservado por confirmar
            </Typography>
          </Box>
          <Box component='div' sx={[stylesColorReservadoPorConfirmar, stylesWidthHeightColor]}></Box>
        </Box>
        <Box component='div'>
          <Box component='div' sx={stylesBackgroundHeaderAvailable}>
            <Typography component='p' sx={stylesTextTitleAvailable}>
              Check-out saldo deudor
            </Typography>
          </Box>
          <Box component='div' sx={[stylesColorCheckout, stylesWidthHeightColor]}></Box>
        </Box>
        <Box component='div'>
          <Box component='div' sx={stylesBackgroundHeaderAvailable}>
            <Typography component='p' sx={stylesTextTitleAvailable}>
              Bloqueado
            </Typography>
          </Box>
          <Box component='div' sx={[stylesColorBloqueado, stylesWidthHeightColor]}></Box>
        </Box>
        <Box component='div'>
          <Box component='div' sx={stylesBackgroundHeaderAvailable}>
            <Typography component='p' sx={stylesTextTitleAvailable}>
              Bloqueado confirmar
            </Typography>
          </Box>
          <Box component='div' sx={[stylesColorBloqueadoConfirmar, stylesWidthHeightColor]}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ColorBarAvailables;
