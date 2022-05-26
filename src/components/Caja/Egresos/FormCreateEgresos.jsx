import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Select,
  TextField,
  MenuItem,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Caja/stylesCaja';

const FormCreateEgresos = ({ setOpenAlert, setMessageInfo, setMessageSeverity, pago, categoria }) => {
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

      const res = await postGeneralTable(identifier, password, endpointEgreso, generalData);

      if (res.status >= 200 && res.status <= 299) {
        setOpenAlert(true);
        setMessageInfo('Gasto registrado correctamente');
        setMessageSeverity('success');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al registrar gasto');
        setMessageSeverity('error');
        return;
      }
    } else {
      setOpenAlert(true);
      setMessageInfo('Por favor, rellene todos los campos');
      setMessageSeverity('error');
    }
  };

  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 655.02 }]}>
      <CssBaseline />
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
            placeholder='Concepto'
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
            placeholder='$0.00'
            required
            fullWidth
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Con factura' />
          <FormControlLabel
            control={
              <Checkbox name='factura' onChange={handleCheckbox} disableRipple sx={{ padding: 0, paddingLeft: 1 }} />
            }
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
                const { categoria, id } = item;

                return (
                  <MenuItem key={id} value={item}>
                    {categoria}
                  </MenuItem>
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
                    const { descripcion, id } = subitem;

                    return (
                      <MenuItem key={id} value={id}>
                        {descripcion}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Box>
        <Button variant='contained' onClick={postEgreso} size='large' startIcon={<SaveIcon />} sx={{ marginTop: 2 }}>
          Registrar Gasto
        </Button>
      </Box>
    </Container>
  );
};

export default FormCreateEgresos;
