import React, { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import {
  stylesBoxButtons,
  stylesButtonSend,
  stylesFormControlLabel,
  stylesGridWrapperCheckboxs,
  stylesGridWrapperForm,
  stylesRadioButton,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Dashboard/Reservacion/ReservacionStyles';

const FormReservacion = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Nueva Reservación' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
          <TitleInput titleInput='Fecha de llegada' />
          <TextField
            name='fechaEntrada'
            variant='outlined'
            type='date'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Fecha de salida' />
          <TextField name='fechaSalida' variant='outlined' type='date' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='No. de noches' />
          <TextField name='noNoches' variant='outlined' type='number' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='No. de noches extras por confirmar' />
          <TextField
            name='noNochesConfirmar'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='No. de personas' />
          <FormControl fullWidth>
            <Select size='small' value=''></Select>
          </FormControl>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Tipo de habitación' />
          <FormControl fullWidth>
            <Select size='small' value=''></Select>
          </FormControl>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='No. de habitación' />
          <FormControl fullWidth>
            <Select size='small' value=''></Select>
          </FormControl>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Tarifa' />
          <TextField name='tarifa' variant='outlined' type='number' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Nombre del cliente' />
          <TextField
            name='nombreCliente'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Teléfono del cliente' />
          <TextField name='telefono' variant='outlined' type='tel' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Teléfono del cliente (opcional)' />
          <TextField name='telefonoOpcional' variant='outlined' type='tel' margin='none' size='small' fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Email del cliente' />
          <TextField name='email' variant='outlined' type='email' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Email del cliente (opcional)' />
          <TextField name='emailOpcional' variant='outlined' type='email' margin='none' size='small' fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Empresa del cliente' />
          <TextField
            name='telefonoOpcional'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Hora de llegada' />
          <TextField name='horaLlegada' variant='outlined' type='time' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Forma de pago' />
          <FormControl fullWidth>
            <Select size='small' value=''></Select>
          </FormControl>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Observaciones' />
          <TextField
            name='observaciones'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            multiline
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Confirmación por email' />
          <Box component='div'>
            <RadioGroup sx={stylesGridWrapperCheckboxs}>
              <FormControlLabel
                value='si'
                control={<Radio disableRipple sx={stylesRadioButton} />}
                label='Si'
                sx={stylesFormControlLabel}
              />
              <FormControlLabel
                value='no'
                control={<Radio disableRipple sx={stylesRadioButton} />}
                label='No'
                sx={stylesFormControlLabel}
              />
            </RadioGroup>
          </Box>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Total a pagar' />
          <TextField name='totalPagar' variant='outlined' type='number' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Pagado' />
          <TextField name='pagado' variant='outlined' type='number' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Restante' />
          <TextField name='restante' variant='outlined' type='number' margin='none' size='small' required fullWidth />
        </Box>
      </Box>
      <Box component='div' sx={stylesButtonSend}>
        <Box component='div' sx={stylesBoxButtons}>
          {loadingBtn ? (
            <Box component='div'>
              <ButtonLoader />
            </Box>
          ) : (
            <Box component='div'>
              <Button variant='contained' size='large' startIcon={<SaveIcon />}>
                Registrar Reservación
              </Button>
            </Box>
          )}
          <Box component='div'>
            <Button variant='contained' color='error' size='large' startIcon={<CloseIcon />}>
              Cancelar Reservación
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormReservacion;
