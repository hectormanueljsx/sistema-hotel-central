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

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalHabitaciones from '@/pages/Habitaciones/Habitaciones/ModalHabitacion';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCellHeader,
  stylesTableCellBody,
  stylesWidthHeightTable,
} from '@/pages/Habitaciones/Habitaciones/HabitacionesStyles';

const columns = [
  { id: 'num', label: 'No. de Habitación', width: 200 },
  { id: 'descrip', label: 'Descripción de la Habitación', width: 677 },
  { id: 'acciones', label: 'Acciones', width: 75 },
];
let dataDescription = '';
let dataSelectTarifas = [];

const TableViewHabitaciones = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataHabitaciones, setDataHabitaciones] = useState('');

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  const endpointHabitacion = generalEndpoints.habitacion;

  const handleOpen = item => {
    dataDescription = item.descripcion;
    dataSelectTarifas = item.tarifas.map(element => {
      return element.descripcion;
    });

    setOpenModal(true);
    setDataHabitaciones(item);
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { list, loading, error } = useGetGeneralTable(identifier, password, endpointHabitacion);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Habitaciones' />
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
              {loading && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
              {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const { id, num_hab, descripcion } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCellBody}>{num_hab}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{descripcion}</TableCell>
                    <TableCell sx={stylesTableCellBody}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <VisibilityIcon />
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
          <ModalHabitaciones
            dataHabitaciones={dataHabitaciones}
            dataDescription={dataDescription}
            dataSelectTarifas={dataSelectTarifas}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewHabitaciones;
