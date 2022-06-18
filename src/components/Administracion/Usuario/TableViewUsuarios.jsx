import React, { useState } from 'react';
import {
  Box,
  Container,
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
import Loader from '@/components/Loader/Loader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalUsuario from '@/components/Administracion/Usuario/ModalUsuario';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Administracion/Usuario/UsuarioStyles';

const columns = [
  { id: 'username', label: 'Nombre', width: 462 },
  { id: 'role', label: 'Rol', width: 165 },
  { id: 'ult_ingreso', label: 'Último Ingreso', width: 225 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

const TableViewUsuarios = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataUsuario, setDataUsuario] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
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
    const { status } = await deleteGeneralTable(identifier, password, endpointUsuario, id);
    return status;
  };

  const deleteUsuario = async id => {
    Swal.fire({
      icon: 'warning',
      text: '¿Estás seguro de eliminar este usuario?',
      showCancelButton: true,
      allowOutsideClick: false,
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
              text: 'Usuario eliminado correctamente',
              allowOutsideClick: false,
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
              text: 'Error al eliminar usuario',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
          }
        });
      }
    });
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointUsuario);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Usuarios' />
      <Box component='div'>
        {loading && <Loader />}
        {error && <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {loading || error
                  ? null
                  : columns.map((column, index) => (
                      <TableCell key={index} sx={[stylesTableCell, { width: column.width }]}>
                        {column.label}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const {
                  id,
                  username,
                  role: { name },
                  ult_ingreso,
                } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{username}</TableCell>
                    <TableCell sx={stylesTableCell}>{name}</TableCell>
                    <TableCell sx={stylesTableCell}>{moment(ult_ingreso).format('YYYY-MM-DD hh:mm:ss a')}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color='error' size='small' onClick={() => deleteUsuario(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {loading || error ? null : (
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
        <Box sx={stylesModal}>
          <ModalUsuario dataUsuario={dataUsuario} handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewUsuarios;
