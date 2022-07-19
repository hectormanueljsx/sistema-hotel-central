import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import LoaderImage from '@/components/Loader/LoaderImage';
import LoaderSkeleton from '@/components/Loader/LoaderSkeleton';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalTarifa from '@/pages/Habitaciones/Tarifa/ModalTarifa';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import putGeneralTable from '@/services/putGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import { messageEmptyGetData, messageErrorGetData } from '@/utilities/messagesAlerts';
import {
  stylesSuperpositionModal,
  stylesTableCellBody,
  stylesTableCellHeader,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Habitaciones/Tarifa/TarifaStyles';

const columns = [
  { id: 'desc_tarifa', label: 'Descripción de la Tarifa', width: 451 },
  { id: 'num_personas', label: 'No. de Personas', width: 260 },
  { id: 'precio_aplicado', label: 'Precio Aplicado', width: 195 },
  { id: 'acciones', label: 'Acciones', width: 80 },
];

let dataSelectPersonas = [];

const TableViewTarifas = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataTarifa, setDataTarifa] = useState('');
  const [loaderRequest, setLoaderRequest] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointTarifa = generalEndpoints.tarifa;

  const handleOpen = item => {
    const { personas } = item;
    setOpenModal(true);
    setDataTarifa(item);
    dataSelectPersonas = personas.map(element => {
      return element.num_persona;
    });
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteByIdTarifa = async id => {
    const generalData = { status: false };
    setLoaderRequest(true);
    const { status } = await putGeneralTable(identifier, password, endpointTarifa, id, generalData);
    setLoaderRequest(false);
    return status;
  };

  const deleteTarifa = async id => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmación de eliminación',
      text: '¿Estás seguro de eliminar este registro?',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#d32f2f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        deleteByIdTarifa(id).then(res => {
          if (res >= 200 && res <= 299) {
            Swal.fire({
              icon: 'success',
              title: 'Eliminación con éxito',
              text: 'El registro se ha eliminado con éxito',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            }).then(result => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ah ocurrido un error',
              text: 'Lo sentimos, no se pudo eliminar el registro debido a un problema internamente',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
          }
        });
      }
    });
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, `${endpointTarifa}?status=true`);

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Tarifas' />
      <Box component='div'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={[stylesTableCellHeader, { width: column.width }]}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <LoaderSkeleton />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageErrorGetData} />
                  </TableCell>
                </TableRow>
              ) : list.length > 0 ? (
                list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                  const { id, descripcion, personas, precio } = item;

                  let no_personas = personas.map(persona => `${persona.num_persona}`);

                  return (
                    <TableRow key={id}>
                      <TableCell sx={stylesTableCellBody}>{descripcion}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{no_personas.join('-')}</TableCell>
                      <TableCell sx={stylesTableCellBody}>
                        {precio.toLocaleString('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell sx={stylesTableCellBody}>
                        <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color='error' size='small' onClick={() => deleteTarifa(id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageEmptyGetData} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {loading ? null : (
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        )}
      </Box>
      <Modal open={openModal}>
        <Box component='div' sx={stylesSuperpositionModal}>
          <ModalTarifa dataPersonas={dataSelectPersonas} dataTarifa={dataTarifa} handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </Box>
  );
};

export default TableViewTarifas;
