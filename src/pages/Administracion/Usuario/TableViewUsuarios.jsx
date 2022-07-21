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
import moment from 'moment';
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import LoaderImage from '@/components/Loader/LoaderImage';
import LoaderSkeleton from '@/components/Loader/LoaderSkeleton';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalUsuario from '@/pages/Administracion/Usuario/ModalUsuario';
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
} from '@/pages/Administracion/Usuario/UsuarioStyles';

const columns = [
  { id: 'username', label: 'Nombre', width: 496 },
  { id: 'role', label: 'Rol', width: 175 },
  { id: 'ult_ingreso', label: 'Último Ingreso', width: 235 },
  { id: 'acciones', label: 'Acciones', width: 80 },
];

const TableViewUsuarios = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataUsuario, setDataUsuario] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loaderRequest, setLoaderRequest] = useState(false);
/* const jwt = localStorage.getItem('jwt'); */
  
  const endpointUsuario = generalEndpoints.usuario;

  const handleOpen = item => {
    setOpenModal(true);
    setDataUsuario(item);
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteByIdUsuario = async id => {
    const generalData = { blocked: true };
    setLoaderRequest(true);
    const { status } = await putGeneralTable(endpointUsuario, id, generalData);
    setLoaderRequest(false);
    return status;
  };

  const deleteUsuario = async id => {
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
        deleteByIdUsuario(id).then(res => {
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

  const { list, loading, error } = useGetGeneralTable(`${endpointUsuario}?blocked=false`);

  if (loaderRequest) {
    return <LoaderImage />;
  }

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Usuarios' />
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
                  const {
                    id,
                    username,
                    role: { name },
                    ult_ingreso,
                  } = item;

                  return (
                    <TableRow key={id}>
                      <TableCell sx={stylesTableCellBody}>{username}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{name}</TableCell>
                      <TableCell sx={stylesTableCellBody}>
                        {ult_ingreso ? moment(ult_ingreso).format('YYYY-MM-DD hh:mm:ss a') : null}
                      </TableCell>
                      <TableCell sx={stylesTableCellBody}>
                        <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color='error' size='small' onClick={() => deleteUsuario(id)}>
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
          <ModalUsuario dataUsuario={dataUsuario} handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </Box>
  );
};

export default TableViewUsuarios;
