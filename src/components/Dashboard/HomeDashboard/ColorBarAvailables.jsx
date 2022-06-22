import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import TitlePage from '@/components/Title/TitlePage';
import {
  stylesColorBloqueado,
  stylesColorBloqueadoConfirmar,
  stylesColorCheckout,
  stylesColorDisponible,
  stylesColorOcupado,
  stylesColorOcupadoPorConfirmar,
  stylesColorReservado,
  stylesColorReservadoPorConfirmar,
  stylesContainerSection,
  stylesFlexBox,
  stylesGridBox,
  stylesHeaderAvailable,
  stylesHeightBoxColor,
  stylesTitleAvailable,
  stylesWidthHeightPaletteColors,
} from '@/components/Dashboard/HomeDashboard/HomeDashboardStyles';

const ColorBarAvailables = () => {
  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightPaletteColors]}>
      <TitlePage titlePage='Código de Colores Usados para el Estado de las Habitaciones' />
      <Box sx={stylesGridBox}>
        <Box sx={stylesFlexBox}>
          <Box sx={stylesHeaderAvailable}>
            <Typography component='p' sx={stylesTitleAvailable}>
              Ocupado
            </Typography>
          </Box>
          <Box sx={[stylesHeightBoxColor, stylesColorOcupado]}></Box>
        </Box>
        <Box sx={stylesFlexBox}>
          <Box sx={stylesHeaderAvailable}>
            <Typography component='p' sx={stylesTitleAvailable}>
              Disponible
            </Typography>
          </Box>
          <Box sx={[stylesHeightBoxColor, stylesColorDisponible]}></Box>
        </Box>
        <Box sx={stylesFlexBox}>
          <Box sx={stylesHeaderAvailable}>
            <Typography component='p' sx={stylesTitleAvailable}>
              Reservado
            </Typography>
          </Box>
          <Box sx={[stylesHeightBoxColor, stylesColorReservado]}></Box>
        </Box>
        <Box sx={stylesFlexBox}>
          <Box sx={stylesHeaderAvailable}>
            <Typography component='p' sx={stylesTitleAvailable}>
              Ocupado por confirmar
            </Typography>
          </Box>
          <Box sx={[stylesHeightBoxColor, stylesColorOcupadoPorConfirmar]}></Box>
        </Box>
        <Box sx={stylesFlexBox}>
          <Box sx={stylesHeaderAvailable}>
            <Typography component='p' sx={stylesTitleAvailable}>
              Reservado por confirmar
            </Typography>
          </Box>
          <Box sx={[stylesHeightBoxColor, stylesColorReservadoPorConfirmar]}></Box>
        </Box>
        <Box sx={stylesFlexBox}>
          <Box sx={stylesHeaderAvailable}>
            <Typography component='p' sx={stylesTitleAvailable}>
              Check-out saldo deudor
            </Typography>
          </Box>
          <Box sx={[stylesHeightBoxColor, stylesColorCheckout]}></Box>
        </Box>
        <Box sx={stylesFlexBox}>
          <Box sx={stylesHeaderAvailable}>
            <Typography component='p' sx={stylesTitleAvailable}>
              Bloqueado
            </Typography>
          </Box>
          <Box sx={[stylesHeightBoxColor, stylesColorBloqueado]}></Box>
        </Box>
        <Box sx={stylesFlexBox}>
          <Box sx={stylesHeaderAvailable}>
            <Typography component='p' sx={stylesTitleAvailable}>
              Bloqueado confirmar
            </Typography>
          </Box>
          <Box sx={[stylesHeightBoxColor, stylesColorBloqueadoConfirmar]}></Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ColorBarAvailables;
