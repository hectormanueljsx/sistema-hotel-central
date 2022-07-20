import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, MenuItem, Select, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import LoaderImage from '@/components/Loader/LoaderImage';
import getSpecificSelect from '@/services/getSpecificSelect';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonAlignEnd,
  stylesButtonCloseModal,
  stylesCheckboxForm,
  stylesGridWrapperButtons,
  stylesGridWrapperModal,
  stylesWidthAutoButtons,
  stylesWidthHeightModal,
  stylesWrapperBoxShadow,
} from '@/pages/Caja/Egresos/EgresosStyles';

const ModalEgreso = ({ dataEgreso, pago, categoria, dataCategoria, handleCloseModal }) => {
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
  const [loaderRequest, setLoaderRequest] = useState(false);

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

    if (datos.concepto.trim().length > 0 && datos.importe && idPago && idSubcategoria) {
      const generalData = {
        importe: datos.importe,
        facturado,
        concepto: datos.concepto.toUpperCase(),
        pago: { id: idPago },
        subcategoria: { id: idSubcategoria },
      };

      setLoaderRequest(true);
      const res = await putGeneralTable(identifier, password, endpointEgreso, dataEgreso.id, generalData);
      setLoaderRequest(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          title: 'Actualización con éxito',
          text: 'El registro se ha actualizado con éxito',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-container',
          },
        }).then(result => {
          if (result.isConfirmed) {
            handleCloseModal();
            location.reload();
          }
        });
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Ah ocurrido un error',
          text: 'Lo sentimos, no se pudo actualizar el registro debido a un problema internamente',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-container',
          },
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ah ocurrido un error',
        text: 'Por favor, rellene todos los campos',
        allowOutsideClick: false,
        confirmButtonColor: '#1976d2',
        confirmButtonText: 'Aceptar',
        customClass: {
          container: 'swal-container',
        },
      });
    }
  };

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Gasto' />
      <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesButtonCloseModal}>
        <CloseIcon />
      </Button>
      <Box component='form' sx={stylesGridWrapperModal}>
        <Box component='div'>
          <TitleInput titleInput='Concepto' />
          <TextField
            defaultValue={dataEgreso.concepto}
            onChange={handleInputChange}
            name='concepto'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
            disabled={disabledModal}
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Importe' />
          <TextField
            defaultValue={dataEgreso.importe}
            onChange={handleInputChange}
            name='importe'
            variant='outlined'
            type='number'
            margin='none'
            size='small'
            required
            fullWidth
            disabled={disabledModal}
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Con factura' />
          <FormControlLabel
            disabled={disabledModal}
            control={<Checkbox name='factura' onChange={handleCheckbox} disableRipple sx={stylesCheckboxForm} />}
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Forma de pago' />
          <FormControl disabled={disabledModal} fullWidth>
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
          <FormControl disabled={disabledModal} fullWidth>
            <Select size='small' value={idCategoria} onChange={handleCategoria}>
              {categoria.length > 0 ? (
                categoria.map(item => {
                  const { categoria, id, status } = item;

                  return status ? (
                    <MenuItem key={id} value={id}>
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
          <FormControl disabled={disabledModal} fullWidth>
            <Select size='small' value={idSubcategoria} onChange={handleSubCategoria}>
              {itemCategoria ? (
                itemCategoria.subcategorias.length > 0 ? (
                  itemCategoria.subcategorias.map(subitem => {
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
        <Box component='div'>
          <TitleInput titleInput='Fecha' />
          <TextField
            value={moment(dataEgreso.fecha).format('YYYY-MM-DD hh:mm:ss')}
            name='fecha'
            variant='outlined'
            type='datetime'
            margin='none'
            size='small'
            required
            fullWidth
            disabled={true}
          />
        </Box>
        <Box component='div'>
          <TitleInput titleInput='Usuario' />
          <TextField
            value={dataEgreso.users_permissions_user.username}
            name='usuario'
            variant='outlined'
            type='text'
            margin='none'
            size='small'
            required
            fullWidth
            disabled={true}
          />
        </Box>
      </Box>
      <Box component='div' sx={stylesGridWrapperButtons}>
        <Box component='div' sx={stylesButtonAlignEnd}>
          <Button
            variant='contained'
            disabled={disableView}
            onClick={viewDisabled}
            size='large'
            startIcon={<EditIcon />}
            sx={stylesWidthAutoButtons}
          >
            Modificar
          </Button>
        </Box>
        <Box component='div'>
          <Button
            variant='contained'
            disabled={disabledModal}
            onClick={putEgreso}
            size='large'
            startIcon={<SaveIcon />}
            sx={stylesWidthAutoButtons}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalEgreso;
