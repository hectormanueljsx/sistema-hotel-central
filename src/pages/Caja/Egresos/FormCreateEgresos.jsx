import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Select, TextField, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import LoaderImage from '@/components/Loader/LoaderImage';
import postGeneralTable from '@/services/postGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesCheckboxForm,
  stylesGridWrapperForm,
  stylesWidthHeightForm,
  stylesWrapperBoxShadow,
} from '@/pages/Caja/Egresos/EgresosStyles';

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
  const [loaderRequest, setLoaderRequest] = useState(false);

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

      setLoaderRequest(true);
      const res = await postGeneralTable(identifier, password, endpointEgreso, generalData);
      setLoaderRequest(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          title: 'Creación con éxito',
          text: 'El registro se ha creado con éxito',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        }).then(result => result.isConfirmed && location.reload());
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Ah ocurrido un error',
          text: 'Lo sentimos, no se pudo crear el registro debido a un problema internamente',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ah ocurrido un error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightForm]}>
      <TitlePage titlePage='Registro de Gasto' />
      <Box component='form' sx={stylesGridWrapperForm}>
        <Box component='div'>
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
        <Box component='div'>
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
        <Box component='div'>
          <TitleInput titleInput='Con factura' />
          <FormControlLabel
            control={<Checkbox name='factura' onChange={handleCheckbox} disableRipple sx={stylesCheckboxForm} />}
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Forma de pago' />
          <FormControl fullWidth>
            <Select size='small' value={idPago} onChange={handlePago}>
              {pago.length > 0 ? (
                pago.map(item => {
                  const { f_pago, id } = item;

                  return (
                    <MenuItem key={id} value={id}>
                      {f_pago}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Categoría' />
          <FormControl fullWidth>
            <Select size='small' value={idCategoria} onChange={handleCategoria}>
              {categoria.length > 0 ? (
                categoria.map(item => {
                  const { categoria, id, status } = item;

                  return status ? (
                    <MenuItem key={id} value={item}>
                      {categoria}
                    </MenuItem>
                  ) : null;
                })
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Subcategoría' />
          <FormControl fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubCategoria}>
              {idCategoria ? (
                idCategoria.subcategorias.length > 0 ? (
                  idCategoria.subcategorias.map(subitem => {
                    const { descripcion, id, status } = subitem;

                    return status ? (
                      <MenuItem key={id} value={id}>
                        {descripcion}
                      </MenuItem>
                    ) : null;
                  })
                ) : (
                  <MenuItem value=''>No se encontraron opciones</MenuItem>
                )
              ) : (
                <MenuItem value=''>No se encontraron opciones</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box component='div' sx={stylesButtonSend}>
        <Button variant='contained' onClick={postEgreso} size='large' startIcon={<SaveIcon />}>
          Registrar Gasto
        </Button>
      </Box>
    </Box>
  );
};

export default FormCreateEgresos;
