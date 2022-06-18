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
import Swal from 'sweetalert2';

import TitlePage from '@/components/Title/TitlePage';
import Loader from '@/components/Loader/Loader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalTarifa from '@/components/Habitaciones/Tarifa/ModalTarifa';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Habitaciones/Tarifa/TarifaStyles';

const columns = [
  { id: 'desc_tarifa', label: 'Descripción de la Tarifa', width: 482 },
  { id: 'num_personas', label: 'No. de Personas', width: 185 },
  { id: 'precio_aplicado', label: 'Precio Aplicado', width: 185 },
  { id: 'acciones', label: 'Acciones', width: 100 },
];

const TableViewTarifas = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataTarifa, setDataTarifa] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointTarifa = generalEndpoints.tarifa;

  const handleOpen = item => {
    setOpenModal(true);
    setDataTarifa(item);
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteByIdTarifa = async id => {
    const { status } = await deleteGeneralTable(identifier, password, endpointTarifa, id);
    return status;
  };

  const deleteTarifa = async id => {
    Swal.fire({
      icon: 'warning',
      text: '¿Estás seguro de eliminar esta tarifa?',
      showCancelButton: true,
      allowOutsideClick: false,
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
              text: 'Tarifa eliminada correctamente',
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
              text: 'Error al eliminar tarifa',
              allowOutsideClick: false,
              confirmButtonColor: '#1976d2',
              confirmButtonText: 'Aceptar',
            });
          }
        });
      }
    });
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointTarifa);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Tarifas' />
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
                const { id, descripcion, no_personas, precio } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>{no_personas}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {precio.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCell}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color='error' size='small' onClick={() => deleteTarifa(id)}>
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
          <ModalTarifa dataTarifa={dataTarifa} handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewTarifas;
