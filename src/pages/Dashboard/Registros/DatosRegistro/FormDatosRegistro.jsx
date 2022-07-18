import React, { useState } from 'react';
import { Box, Button, FormControl, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import {
  stylesButtonSend,
  stylesGridWrapperButtons,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Dashboard/Registros/DatosRegistro/DatosRegistroStyles';

const FormDatosRegistro = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);

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
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Fecha de llegada' />
          <TextField name='fechaLlegada' variant='outlined' type='date' margin='none' size='small' required fullWidth />
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
          <TitleInput titleInput='Email del cliente' />
          <TextField name='email' variant='outlined' type='email' margin='none' size='small' required fullWidth />
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
          <TitleInput titleInput='Check-out' />
          <TextField name='checkout' variant='outlined' type='text' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Hora de llegada' />
          <TextField name='horaLlegada' variant='outlined' type='time' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Hora de salida' />
          <TextField name='horaSalida' variant='outlined' type='time' margin='none' size='small' required fullWidth />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Reserva' />
        </Box>
      </Box>
      <Box component='form' sx={stylesButtonSend}>
        <Box component='div' sx={stylesGridWrapperButtons}>
          <Box component='div'>
            <Button variant='contained' size='large' startIcon={<EditIcon />}>
              Modificar
            </Button>
          </Box>
          {loadingBtn ? (
            <Box component='div'>
              <ButtonLoader />
            </Box>
          ) : (
            <Box component='div'>
              <Button variant='contained' size='large' startIcon={<UpdateIcon />}>
                Actualizar
              </Button>
            </Box>
          )}
          <Box component='div'>
            <Button variant='contained' color='error' size='large' startIcon={<CloseIcon />}>
              Cancelar
            </Button>
          </Box>
          <Box component='div'>
            <Button variant='contained' size='large' startIcon={<ManageAccountsIcon />}>
              Cambio de Cliente
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormDatosRegistro;
