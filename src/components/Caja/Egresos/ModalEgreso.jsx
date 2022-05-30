import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';

import TitlePage from '@/components/TitlePage';
import TitleInput from '@/components/TitleInput';
import getSpecificSelect from '@/services/getSpecificSelect';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerBoxButtonAlign,
  stylesContainerInput,
  stylesContainerSection,
} from '@/components/Caja/stylesCaja';

const ModalEgreso = ({
  dataEgreso,
  pago,
  categoria,
  dataCategoria,
  setOpenAlert,
  setMessageInfo,
  setMessageSeverity,
}) => {
  const [datos, setDatos] = useState({
    importe: dataEgreso.importe,
    concepto: dataEgreso.concepto,
  });
  const [idPago, setIdPago] = useState(dataEgreso.pago.id);
  const [idCategoria, setIdCategoria] = useState(dataCategoria[0].id);
  const [idSubcategoria, setIdSubcategoria] = useState(dataEgreso.subcategoria.id);
  const [itemCategoria, setItemCategoria] = useState(dataCategoria[0]);
  const [facturado, setFacturado] = useState(false);
  const [disabledModal, setDisabledModal] = useState(true);
  const [disableView, setDisableView] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointEgreso = generalEndpoints.egreso;
  const endpointCategoria = generalEndpoints.categoria;
  const attributeCategoria = 'id';

  const handlePago = event => setIdPago(event.target.value);
  const handleSubCategoria = event => setIdSubcategoria(event.target.value);
  const handleInputChange = event => setDatos({ ...datos, [event.target.name]: event.target.value });
  const handleCheckbox = e => setFacturado(e.target.checked);

  const handleCategoria = async event => {
    const result = await getSpecificSelect(
      identifier,
      password,
      endpointCategoria,
      attributeCategoria,
      event.target.value,
    );
    setItemCategoria(result.data[0]);
    setIdCategoria(result.data[0].id);
  };

  const viewDisabled = event => {
    event.preventDefault();
    setDisabledModal(false);
    setDisableView(true);
  };

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

      const res = await putGeneralTable(identifier, password, endpointEgreso, dataEgreso.id, generalData);

      if (res.status >= 200 && res.status <= 299) {
        setOpenAlert(true);
        setMessageInfo('Egreso actualizado correctamente');
        setMessageSeverity('success');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        setOpenAlert(true);
        setMessageInfo('Error al actualizar egreso');
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
    <Container component='section' sx={[stylesContainerSection, { width: 780, marginTop: 0 }]}>
      <CssBaseline />
      <TitlePage titlePage='Actualización de Gasto' />
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
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
              fullWidth
              disabled={disabledModal}
              autoFocus
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
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
              fullWidth
              disabled={disabledModal}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
            <TitleInput titleInput='Con factura' />
            <FormControlLabel
              disabled={disabledModal}
              control={
                <Checkbox name='factura' onChange={handleCheckbox} disableRipple sx={{ padding: 0, paddingLeft: 1 }} />
              }
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
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
              fullWidth
              disabled={true}
              autoFocus
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
            <TitleInput titleInput='Iva' />
            <TextField
              value={dataEgreso.iva}
              name='iva'
              variant='outlined'
              type='number'
              margin='none'
              size='small'
              placeholder='iva'
              disabled={true}
              fullWidth
              required
              autoFocus
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
            <TitleInput titleInput='Forma de pago' />
            <FormControl disabled={disabledModal} fullWidth>
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
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
            <TitleInput titleInput='Categoría' />
            <FormControl disabled={disabledModal} fullWidth>
              <Select size='small' value={idCategoria} onChange={handleCategoria}>
                {categoria.map(item => {
                  const { categoria, id } = item;

                  return (
                    <MenuItem key={id} value={id}>
                      {categoria}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
            <TitleInput titleInput='Subcategoría' />
            <FormControl disabled={disabledModal} fullWidth>
              <Select size='small' value={idSubcategoria} onChange={handleSubCategoria}>
                {itemCategoria
                  ? itemCategoria.subcategorias.map(subitem => {
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
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
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
          <Box component='div' sx={[stylesContainerInput, { width: 352 }]}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Box component='div' sx={[stylesContainerBoxButtonAlign, { width: 352 }]}>
            <Button
              variant='contained'
              disabled={disableView}
              onClick={viewDisabled}
              size='large'
              startIcon={<EditIcon />}
            >
              Modificar
            </Button>
          </Box>
          <Box component='div' sx={{ width: 352 }}>
            <Button
              variant='contained'
              disabled={disabledModal}
              onClick={putEgreso}
              size='large'
              startIcon={<UpdateIcon />}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ModalEgreso;
