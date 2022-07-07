import React from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import {
  stylesBoxInputs,
  stylesBoxModal,
  stylesContainerInput,
  stylesContainerInputNoMargin,
  stylesContainerSection,
  stylesModalClose,
  stylesWidthHeightModal,
  stylesWidthInput,
} from '@/pages/Reportes/Fallas/FallasStyles';

const ModalMantenimiento = ({ dataMantenimiento, handleCloseModal }) => {
  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Detalles de la Falla' />
      <Box component='form' sx={stylesBoxModal}>
        <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesModalClose}>
          <CloseIcon />
        </Button>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Motivo' />
            <TextField
              defaultValue={dataMantenimiento.motivo}
              disabled={true}
              name='motivo'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Fecha de inicio' />
            <TextField
              defaultValue={dataMantenimiento.f_inicio}
              disabled={true}
              name='fechaInicio'
              variant='outlined'
              type='date'
              margin='none'
              size='small'
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
              disabled={true}
              name='fechafin'
              variant='outlined'
              type='date'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Precio' />
            <TextField
              defaultValue={dataMantenimiento.costo}
              disabled={true}
              name='precio'
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
            <TitleInput titleInput='Habitación' />
            <TextField
              defaultValue={dataMantenimiento.habitacion.num_hab}
              disabled={true}
              name='habitación'
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Estado' />
            <TextField
              defaultValue={dataMantenimiento.estado}
              disabled={true}
              name='estado'
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
            <TitleInput titleInput='Realizado por' />
            <TextField
              defaultValue={dataMantenimiento.trabajador}
              disabled={true}
              name='trabajador'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Reportado por' />
            <TextField
              defaultValue={dataMantenimiento.reporta}
              disabled={true}
              name='reporta'
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
          <Box component='div' sx={[stylesContainerInput, stylesContainerInputNoMargin, stylesWidthInput]}>
            <TitleInput titleInput='Subcategoría' />
            <TextField
              defaultValue={dataMantenimiento.subcategoria.descripcion}
              disabled={true}
              name='subcategoria'
              variant='outlined'
              type='text'
              margin='none'
              size='small'
              required
              fullWidth
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesContainerInputNoMargin, stylesWidthInput]}>
            <TitleInput titleInput='Usuario' />
            <TextField
              defaultValue={dataMantenimiento.users_permissions_user.username}
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
      </Box>
    </Container>
  );
};

export default ModalMantenimiento;
