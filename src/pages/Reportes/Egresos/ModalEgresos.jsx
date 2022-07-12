import React from 'react';
import { Box, Checkbox, FormControlLabel, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import {
  stylesButtonCloseModal,
  stylesCheckboxForm,
  stylesGridWrapperModal,
  stylesWidthHeightModal,
  stylesWrapperBoxShadow,
} from '@/pages/Reportes/Egresos/EgresosStyles';

const ModalEgresos = ({ dataEgreso, handleCloseModal }) => {
  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightModal]}>
      <TitlePage titlePage='Detalles de Egreso' />
      <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesButtonCloseModal}>
        <CloseIcon />
      </Button>
      <Box component='form' sx={stylesGridWrapperModal}>
        <Box component='div'>
          <TitleInput titleInput='Id' />
          <TextField
            defaultValue={dataEgreso.id}
            disabled={true}
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Concepto' />
          <TextField
            defaultValue={dataEgreso.concepto}
            disabled={true}
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Con factura' />
          <FormControlLabel
            disabled={true}
            control={<Checkbox checked={dataEgreso.facturado} disableRipple sx={stylesCheckboxForm} />}
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Importe' />
          <TextField
            defaultValue={dataEgreso.importe}
            disabled={true}
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Iva' />
          <TextField
            value={dataEgreso.iva}
            disabled={true}
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            fullWidth
            required
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Subtotal' />
          <TextField
            value={dataEgreso.subtotal}
            disabled={true}
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Forma de pago' />
          <TextField
            value={dataEgreso.pago.f_pago}
            disabled={true}
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            fullWidth
            required
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Subcategoría' />
          <TextField
            value={dataEgreso.subcategoria.descripcion}
            disabled={true}
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            fullWidth
            required
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Fecha' />
          <TextField
            value={moment(dataEgreso.fecha).format('YYYY-MM-DD hh:mm:ss a')}
            name='fecha'
            variant='outlined'
            type='datetime'
            margin='none'
            size='small'
            required
            fullWidth
            disabled={true}
            autoFocus
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Usuario' />
          <TextField
            value={dataEgreso.users_permissions_user.username}
            disabled={true}
            name='usuario'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ModalEgresos;
