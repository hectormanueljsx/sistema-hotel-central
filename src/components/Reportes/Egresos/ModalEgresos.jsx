import React from 'react';
import { Box, Checkbox, Container, FormControlLabel, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import {
  stylesBoxInputs,
  stylesBoxModal,
  stylesCheckboxForm,
  stylesContainerInput,
  stylesContainerSection,
  stylesModalClose,
  stylesWidthHeightModal,
  stylesWidthInput,
} from '@/components/Reportes/Egresos/EgresosStyles';

const ModalEgresos = ({ dataEgreso, handleCloseModal }) => {
  return (
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Detalles de Egreso' />
      <Box component='form' sx={stylesBoxModal}>
        <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesModalClose}>
          <CloseIcon />
        </Button>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Con factura' />
            <FormControlLabel
              disabled={true}
              control={<Checkbox checked={dataEgreso.facturado} disableRipple sx={stylesCheckboxForm} />}
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
    </Container>
  );
};

export default ModalEgresos;
