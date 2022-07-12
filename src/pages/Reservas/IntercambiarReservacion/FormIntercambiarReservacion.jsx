import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import {
  stylesArrowLeft,
  stylesArrowRight,
  stylesBoxIconArrow,
  stylesButtonSend,
  stylesGridWrapperForm,
  stylesTextTitleForm,
  stylesWidthHeightForm,
  stylesWrapperBoxForms,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/IntercambiarReservacion/IntercambiarReservacionStyle';

const FormIntercambiarReservacion = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  return (
    <Box component='section' sx={stylesWrapperBoxShadow}>
      <TitlePage titlePage='Intercambio de Reservación' />
      <Box component='div' sx={stylesWrapperBoxForms}>
        <Box component='div' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
          <Typography component='h3' sx={stylesTextTitleForm}>
            Ingresa la Reservación a Intercambiar para Primera Habitación
          </Typography>
          <Box component='div' sx={stylesBoxIconArrow}>
            <ArrowCircleRightIcon sx={stylesArrowRight} />
          </Box>
          <Box component='form' sx={stylesGridWrapperForm}>
            <Box component='div'>
              <TitleInput titleInput='No. de habitación 1' />
              <TextField
                variant='outlined'
                name='habitacionOne'
                type='number'
                margin='none'
                size='small'
                required
                fullWidth
                autoFocus
              />
            </Box>
            <Box component='div'>
              <TitleInput titleInput='No. de reserva' />
              <TextField
                variant='outlined'
                name='noReservaOne'
                type='number'
                margin='none'
                size='small'
                required
                fullWidth
              />
            </Box>
          </Box>
        </Box>
        <Box component='div' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
          <Typography component='h3' sx={stylesTextTitleForm}>
            Ingresa la Reservación o Registro para la Segunda Habitación
          </Typography>
          <Box component='div' sx={stylesBoxIconArrow}>
            <ArrowCircleLeftIcon sx={stylesArrowLeft} />
          </Box>
          <Box component='form' sx={stylesGridWrapperForm}>
            <Box component='div'>
              <TitleInput titleInput='No. de habitación 2' />
              <TextField
                variant='outlined'
                name='habitacionTwo'
                type='number'
                margin='none'
                size='small'
                required
                fullWidth
              />
            </Box>
            <Box component='div'>
              <TitleInput titleInput='No. de reserva' />
              <TextField
                variant='outlined'
                name='noReservaTwo'
                type='number'
                margin='none'
                size='small'
                required
                fullWidth
              />
            </Box>
            <Box component='div'>
              <TitleInput titleInput='O' />
            </Box>
            <Box component='div'>
              <TitleInput titleInput='No. de registro' />
              <TextField
                variant='outlined'
                name='noRegistro'
                type='number'
                margin='none'
                size='small'
                required
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {loadingBtn ? (
        <Box component='div' sx={stylesButtonSend}>
          <ButtonLoader />
        </Box>
      ) : (
        <Box component='div' sx={stylesButtonSend}>
          <Button variant='contained' size='large' startIcon={<SyncAltIcon />}>
            Intercambiar Habitación
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FormIntercambiarReservacion;
