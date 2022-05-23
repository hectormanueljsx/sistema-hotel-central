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
import UpdateIcon from '@mui/icons-material/Update';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import { generalEndpoints } from '@/utilities/endpoints';
import putGeneralTable from '@/services/putGeneralTable';
import { stylesContainerBox, stylesContainerInput, stylesContainerSection } from '@/components/Caja/stylesCaja';

const ModalEgreso = ({ dataEgreso, pago, categoria, dataCategoria }) => {
  const [datos, setDatos] = useState({
    importe: dataEgreso.importe,
    concepto: dataEgreso.concepto,
  });
  const [idPago, setidPago] = useState(dataEgreso.pago.id);
  const [idCategoria, setidCategoria] = useState(dataCategoria[0]);
  const [idSubcategoria, setidSubcategoria] = useState(dataEgreso.subcategoria.id);
  const [facturado, setFacturado] = useState(false);
  const identifier = 'test@email.com';
  const password = 'Test123';
  const endpointEgreso = generalEndpoints.egreso;

  const handlePago = event => setidPago(event.target.value);
  const handleCategoria = event => setidCategoria(event.target.value);
  const handleSubCategoria = event => setidSubcategoria(event.target.value);
  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });
  const handleCheckbox = e => setFacturado(e.target.checked);

  //pendiente el usuario dinamico
  const putEgreso = async event => {
    event.preventDefault();

    if (datos.concepto && datos.importe && idPago && idSubcategoria) {
      const generalData = {
        importe: datos.importe,
        facturado,
        concepto: datos.concepto.toUpperCase(),
        pago: { id: idPago },
        subcategoria: { id: idSubcategoria },
      };
      console.log(generalData);
      await putGeneralTable(identifier, password, endpointEgreso, dataEgreso.id, generalData);
      location.reload();
    } else {
      alert('Por favor, llene todos los campos');
    }
  };
  return (
    <Container component='section' sx={[stylesContainerSection, { width: 400, height: 655.02  }]}>
      <CssBaseline />
      <TitlePage titlePage='Registro de Gasto' />
      <Box component='form' sx={stylesContainerBox}>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Concepto' />
          <TextField
            defaultValue={dataEgreso.concepto}
            onChange={handleInputChange}
            name='concepto'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            placeholder='Concepto'
            required
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Importe' />
          <TextField
            defaultValue={dataEgreso.importe}
            onChange={handleInputChange}
            name='importe'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            placeholder='$0.00'
            required
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
          <TitleInput titleInput='Subtotal' />
          <TextField
            value={dataEgreso.subtotal}
            name='subtotal'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            placeholder='subtotal'
            required
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Iva' />
          <TextField
            value={dataEgreso.iva}
            name='iva'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            placeholder='iva'
            required
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Forma de pago' />
          <FormControl>
            <Select size='small' value={idPago} onChange={handlePago}>
              {pago.map((item, index) => {
                const { f_pago, id } = item;
                return (
                  <MenuItem key={f_pago} value={id}>
                    {f_pago}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Categoría' />
          <FormControl>
            <Select size='small' value={idCategoria} onChange={handleCategoria}>
              {categoria.map((item, index) => {
                const { categoria } = item;
                console.log(categoria.categoria);
                return (
                  <MenuItem key={categoria} value={item}>
                    {categoria}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Subcategoría' />
          <FormControl>
            <Select size='small' value={idSubcategoria} onChange={handleSubCategoria}>
              {idCategoria
                ? idCategoria.subcategorias.map((subitem, idx) => {
                    const { descripcion, id } = subitem;
                    return (
                      <MenuItem key={descripcion} value={id}>
                        {descripcion}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Box>
        <Box component='div' sx={stylesContainerInput}>
          <TitleInput titleInput='Fecha' />
          <TextField
            value={dataEgreso.fecha}
            name='fecha'
            variant='outlined'
            type='datetime'
            margin='none'
            size='small'
            placeholder='fecha'
            required
            autoFocus
          />
        </Box>
        <Box component='div' sx={stylesContainerInput}>
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
            autoFocus
          />
        </Box>
        <Button variant='contained' onClick={putEgreso} size='large' startIcon={<UpdateIcon />} sx={{ marginTop: 2 }}>
          Registrar Gasto
        </Button>
      </Box>
    </Container>
  );
};

export default ModalEgreso;
