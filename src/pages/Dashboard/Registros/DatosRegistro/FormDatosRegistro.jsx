import React from 'react';
import { Box, Button, FormControl, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import {
  stylesButtonSend,
  stylesGridWrapperButtons,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Dashboard/Registros/DatosRegistro/DatosRegistroStyles';

const FormDatosRegistro = () => {
  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Datos de Registro' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
          <TitleInput titleInput='No. de habitación' />
          <TextField
            name='noHabitacion'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Fecha de entrada' />
          <TextField name='entrada' variant='outlined' type='date' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Fecha de salida' />
          <TextField name='salida' variant='outlined' type='date' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Noches seguras' />
          <TextField
            name='nochesSeguras'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Noches extras' />
          <TextField
            name='nochesExtras'
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
          <TitleInput titleInput='Tarifa' />
          <TextField name='tarifa' variant='outlined' type='number' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Cliente' />
          <TextField name='cliente' variant='outlined' type='text' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Correo electrónico' />
          <TextField
            name='correoElectronico'
            variant='outlined'
            type='email'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Teléfono' />
          <TextField name='telefono' variant='outlined' type='tel' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Empresa del cliente' />
          <TextField
            name='empresaCliente'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
          />
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
          <TitleInput titleInput='Registró' />
          <TextField name='registro' variant='outlined' type='text' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Hora de registro' />
          <TextField name='entrada' variant='outlined' type='time' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Check-out' />
          <TextField name='checkout' variant='outlined' type='text' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Hora de salida' />
          <TextField name='salida' variant='outlined' type='time' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Reserva' />
        </Box>
      </Box>
      <Box component='form' sx={stylesGridWrapperButtons}>
        <Box component='div' sx={stylesButtonSend}>
          <Button variant='contained' size='large' startIcon={<EditIcon />}>
            Modificar
          </Button>
        </Box>
        <Box component='div' sx={stylesButtonSend}>
          <Button variant='contained' size='large' startIcon={<UpdateIcon />}>
            Actualizar
          </Button>
        </Box>
        <Box component='div' sx={stylesButtonSend}>
          <Button variant='contained' size='large' startIcon={<CloseIcon />}>
            Cancelar Registro
          </Button>
        </Box>
        <Box component='div' sx={stylesButtonSend}>
          <Button variant='contained' size='large' startIcon={<ManageAccountsIcon />}>
            Cambio de Cliente
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormDatosRegistro;
