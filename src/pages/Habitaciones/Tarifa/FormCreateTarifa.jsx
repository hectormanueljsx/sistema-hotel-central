import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import postGeneralTable from '@/services/postGeneralTable';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesContainerBox,
  stylesCheckboxForm,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/pages/Habitaciones/Tarifa/TarifaStyles';

const FormCreateTarifa = () => {
  const [numPersonas, setNumPersonas] = useState([]);
  const [datos, setDatos] = useState({
    descripcion: '',
    precio: '',
    numPersonas: [],
  });
  const [loadingBtn, setLoadingBtn] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointTarifa = generalEndpoints.tarifa;
  const endpointPersona = generalEndpoints.persona;

  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });

  const handleChangeNumPersonas = event => {
    const {
      target: { value },
    } = event;
    setNumPersonas(typeof value === 'string' ? value.split(',') : value);
  };

  const sendDatos = async event => {
    event.preventDefault();

    if (datos.descripcion.trim().length > 0 && datos.precio.trim().length > 0 && numPersonas.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (numPersonas.includes(list[i].num_persona)) {
          datos.numPersonas.push(list[i].id);
        }
      }

      const generalData = {
        descripcion: datos.descripcion.toUpperCase(),
        precio: datos.precio,
        personas: datos.numPersonas,
      };

      setLoadingBtn(true);
      const res = await postGeneralTable(identifier, password, endpointTarifa, generalData);
      setLoadingBtn(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Tarifa registrada correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar tarifa',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const { list } = useGetGeneralTable(identifier, password, endpointPersona);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Nueva Tarifa' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Descripción de la tarifa' />
          <TextField
            onChange={handleInputChange}
            name='descripcion'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Precio de la tarifa' />
          <TextField
            onChange={handleInputChange}
            name='precio'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='No. de personas' />
          <FormControl fullWidth>
            <Select
              multiple
              value={numPersonas}
              onChange={handleChangeNumPersonas}
              renderValue={selected => selected.join(', ')}
              size='small'
            >
              {list.map(name => (
                <MenuItem key={name.id} value={name.num_persona}>
                  <Checkbox
                    checked={numPersonas.indexOf(name.num_persona) > -1}
                    disableRipple
                    sx={stylesCheckboxForm}
                  />
                  <ListItemText primary={name.num_persona} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {loadingBtn ? (
          <ButtonLoader />
        ) : (
          <Button variant='contained' onClick={sendDatos} size='large' startIcon={<SaveIcon />} sx={stylesButtonSend}>
            Registrar Tarifa
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default FormCreateTarifa;
