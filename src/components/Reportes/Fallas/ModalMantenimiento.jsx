import React from 'react';
import { Box, Button, Container, FormControl, MenuItem, Select, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import {
  stylesBoxInputs,
  stylesBoxModal,
  stylesContainerInput,
  stylesContainerSection,
  stylesModalClose,
  stylesWidthHeightModal,
  stylesWidthInput,
} from '@/components/Reportes/Mantenimiento/MantenimientoStyles';

const ModalMantenimiento = ({ dataMantenimiento, handleCloseModal }) => {
  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Detalles del Mantenimiento' />
      <Box component='form' sx={stylesBoxModal}>
        <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesModalClose}>
          <CloseIcon />
        </Button>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Motivo' />
            <TextField
              defaultValue={dataMantenimiento.motivo}
              name='motivo'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Fecha de inicio' />
            <TextField
              defaultValue={dataMantenimiento.f_inicio}
              name='fechaInicio'
              variant='outlined'
              type='date'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Fecha de termino' />
            <TextField
              defaultValue={dataMantenimiento.f_fin}
              name='fechafin'
              variant='outlined'
              type='date'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Precio' />
            <TextField
              defaultValue={dataMantenimiento.costo}
              name='precio'
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Habitación' />
            <TextField
              defaultValue={dataMantenimiento.habitacion.num_hab}
              name='habitación'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Estado' />
            <TextField
              defaultValue={dataMantenimiento.estado}
              name='estado'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Realizado por:' />
            <TextField
              defaultValue={dataMantenimiento.trabajador}
              name='trabajador'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Reportado por:' />
            <TextField
              defaultValue={dataMantenimiento.reporta}
              name='reporta'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Subcategoría' />
            <TextField
              defaultValue={dataMantenimiento.subcategoria.descripcion}
              name='subcategoria'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Usuario' />
            <TextField
              defaultValue={dataMantenimiento.users_permissions_user.username}
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              disabled={true}
              required
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ModalMantenimiento;
