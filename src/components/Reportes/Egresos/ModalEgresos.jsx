import React from 'react';
import { Box, Checkbox, Container, FormControlLabel, TextField, Button } from '@mui/material';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';

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
} from '@/components/Caja/Egresos/EgresosStyles';

const ModalEgresos = ({ dataEgreso, handleCloseModal }) => {
  return (
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Detalle de Egreso' />
      <Box component='form' sx={stylesBoxModal}>
        <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesModalClose}>
          <CloseIcon />
        </Button>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='id' />
            <TextField
              defaultValue={dataEgreso.id}
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
              disabled={true}
              autoFocus
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Concepto' />
            <TextField
              defaultValue={dataEgreso.concepto}
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
              disabled={true}
              autoFocus
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              required
              fullWidth
              disabled={true}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Iva' />
            <TextField
              value={dataEgreso.iva}
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              disabled={true}
              fullWidth
              required
              autoFocus
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Subtotal' />
            <TextField
              value={dataEgreso.subtotal}
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              required
              fullWidth
              disabled={true}
              autoFocus
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Forma de Pago' />
            <TextField
              value={dataEgreso.pago.f_pago}
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={true}
              fullWidth
              required
              autoFocus
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
              <TitleInput titleInput='Subcategoria' />
              <TextField
                value={dataEgreso.subcategoria.descripcion}
                variant='outlined'
                type='text'
                margin='none'
                size='small'
                disabled={true}
                fullWidth
                required
                autoFocus
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Fecha' />
            <TextField
              value={moment(dataEgreso.fecha).format('YYYY-MM-DD hh:mm:ss')}
              name='fecha'
              variant='outlined'
              type='datetime'
              margin='none'
              size='small'
              placeholder='fecha'
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
              name='usuario'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              placeholder='usuario'
              required
              fullWidth
              disabled={true}
              autoFocus
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}></Box>
      </Box>
    </Container>
  );
};

export default ModalEgresos;
