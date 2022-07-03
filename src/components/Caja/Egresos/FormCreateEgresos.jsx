import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Select,
  TextField,
  MenuItem,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesCheckboxForm,
  stylesContainerBox,
  stylesContainerInput,
  stylesContainerSection,
  stylesWidthHeightForm,
} from '@/components/Caja/Egresos/EgresosStyles';

const FormCreateEgresos = ({ pago, categoria }) => {
  const [datos, setDatos] = useState({
    fecha: '',
    importe: '',
    facturado: '',
    concepto: '',
    formaPago: '',
    subcategoria: '',
  });
  const [idPago, setidPago] = useState('');
  const [idCategoria, setidCategoria] = useState('');
  const [idSubcategoria, setidSubcategoria] = useState('');
  const [facturado, setFacturado] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const idUser = localStorage.getItem('id');
  const endpointEgreso = generalEndpoints.egreso;

  const handlePago = event => setidPago(event.target.value);
  const handleCategoria = event => setidCategoria(event.target.value);
  const handleSubCategoria = event => setidSubcategoria(event.target.value);
  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });
  const handleCheckbox = e => setFacturado(e.target.checked);

  const postEgreso = async event => {
    event.preventDefault();

    const hoy = new Date();

    if (datos.concepto.trim().length > 0 && datos.importe.trim().length && idPago && idSubcategoria) {
      const generalData = {
        fecha: hoy.toISOString(),
        importe: datos.importe,
        facturado,
        concepto: datos.concepto.toUpperCase(),
        users_permissions_user: { id: idUser },
        pago: { id: idPago },
        subcategoria: { id: idSubcategoria },
      };

      setLoadingBtn(true);
      const res = await postGeneralTable(identifier, password, endpointEgreso, generalData);
      setLoadingBtn(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Gasto registrado correctamente',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar gasto',
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

  return (
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Gasto' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Concepto' />
          <TextField
            onChange={handleInputChange}
            name='concepto'
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
          <TitleInput titleInput='Importe' />
          <TextField
            onChange={handleInputChange}
            name='importe'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Con factura' />
          <FormControlLabel
            control={<Checkbox name='factura' onChange={handleCheckbox} disableRipple sx={stylesCheckboxForm} />}
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Forma de pago' />
          <FormControl fullWidth>
            <Select size='small' value={idPago} onChange={handlePago}>
              {pago.map(item => {
                const { f_pago, id } = item;

                return (
                  <MenuItem key={id} value={id}>
                    {f_pago}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Categoría' />
          <FormControl fullWidth>
            <Select size='small' value={idCategoria} onChange={handleCategoria}>
              {categoria.map(item => {
                const { categoria, id, status } = item;

                return status ? (
                  <MenuItem key={id} value={item}>
                    {categoria}
                  </MenuItem>
                ) : (
                  false
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Subcategoría' />
          <FormControl fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubCategoria}>
              {idCategoria
                ? idCategoria.subcategorias.map(subitem => {
                    const { descripcion, id, status } = subitem;

                    return status ? (
                      <MenuItem key={id} value={id}>
                        {descripcion}
                      </MenuItem>
                    ) : (
                      false
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Box>
        {loadingBtn ? (
          <ButtonLoader />
        ) : (
          <Button variant='contained' onClick={postEgreso} size='large' startIcon={<SaveIcon />} sx={stylesButtonSend}>
            Registrar Gasto
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default FormCreateEgresos;
