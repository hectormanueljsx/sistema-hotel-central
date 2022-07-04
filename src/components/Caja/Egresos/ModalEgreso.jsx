import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import TitleInput from '@/components/Title/TitleInput';
import ButtonLoader from '@/components/Loader/ButtonLoader';
import getSpecificSelect from '@/services/getSpecificSelect';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesButtonSend,
  stylesBoxButtons,
  stylesBoxInputs,
  stylesBoxModal,
  stylesCheckboxForm,
  stylesContainerBoxButtonAlign,
  stylesContainerInput,
  stylesContainerSection,
  stylesModalClose,
  stylesWidthHeightModal,
  stylesWidthInput,
} from '@/components/Caja/Egresos/EgresosStyles';

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
  const [loadingBtn, setLoadingBtn] = useState(false);

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

      setLoadingBtn(true);
      const res = await putGeneralTable(identifier, password, endpointEgreso, dataEgreso.id, generalData);
      setLoadingBtn(false);

      if (res.status >= 200 && res.status <= 299) {
        Swal.fire({
          icon: 'success',
          text: 'Gasto actualizado correctamente',
          allowOutsideClick: false,
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
        Swal.fire({
          icon: 'error',
          text: 'Error al actualizar gasto',
          allowOutsideClick: false,
          confirmButtonColor: '#1976d2',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-container',
          },
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
        customClass: {
          container: 'swal-container',
        },
      });
    }
  };

  return (
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightModal]}>
      <TitlePage titlePage='Actualización de Gasto' />
      <Box component='form' sx={stylesBoxModal}>
        <Button variant='text' color='error' size='large' onClick={handleCloseModal} sx={stylesModalClose}>
          <CloseIcon />
        </Button>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        </Box>
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
            <TitleInput titleInput='Con factura' />
            <FormControlLabel
              disabled={disabledModal}
              control={<Checkbox name='factura' onChange={handleCheckbox} disableRipple sx={stylesCheckboxForm} />}
            />
          </Box>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        <Box sx={stylesBoxInputs}>
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
          <Box component='div' sx={[stylesContainerInput, stylesWidthInput]}>
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
        <Box sx={stylesBoxButtons}>
          {loadingBtn ? (
            <ButtonLoader />
          ) : (
            <>
              <Box component='div' sx={[stylesContainerBoxButtonAlign, stylesWidthInput]}>
                <Button
                  variant='contained'
                  disabled={disableView}
                  onClick={viewDisabled}
                  size='large'
                  startIcon={<EditIcon />}
                  sx={stylesButtonSend}
                >
                  Modificar
                </Button>
              </Box>
              <Box component='div' sx={stylesWidthInput}>
                <Button
                  variant='contained'
                  disabled={disabledModal}
                  onClick={putEgreso}
                  size='large'
                  startIcon={<UpdateIcon />}
                  sx={stylesButtonSend}
                >
                  Actualizar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ModalEgreso;
