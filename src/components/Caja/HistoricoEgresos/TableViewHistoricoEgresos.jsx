import React, { useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
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
import Loader from '@/components/Loader/Loader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
//import ModalTarifa from '@/components/Habitaciones/Tarifa/ModalTarifa';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Caja/HistoricoEgresos/HistoricoEgresosStyles';
const columns = [
  { id: 'num_gasto', label: 'N° Gasto', width: 140 },
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'concepto', label: 'Concepto', width: 250 },
  { id: 'importe', label: 'Importe', width: 112 },
  { id: 'detalles', label: 'Detalles', width: 250 },
];

const TableViewHistoricoEgresos = ({ search, dataEgreso, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [openModal, setOpenModal] = useState(false);
  // const [dataTarifa, setDataTarifa] = useState('');

  //const handleClose = () => setOpenModal(false);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleOpen = item => {
    setOpenModal(true);
    setDataTarifa(item);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterConcepto = dataEgreso.filter(item => item.concepto.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <CssBaseline />
      <TitlePage titlePage='Histórico de Egresos' />
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
              {filterConcepto.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const { id, fecha, concepto, importe, p_caja } = item;
                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{id}</TableCell>
                    <TableCell sx={stylesTableCell}>{fecha}</TableCell>
                    <TableCell sx={stylesTableCell}>{concepto}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {importe.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCell}>
                      {p_caja ? 'En Caja' : 'Corte de Caja'}
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
            count={filterConcepto.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        )}
      </Box>
      {/* <Modal open={openModal} onClose={handleClose}>
        <Box sx={stylesModal}>
          <ModalTarifa
            dataTarifa={dataTarifa}
            setOpenAlert={setOpenAlert}
            setMessageInfo={setMessageInfo}
            setMessageSeverity={setMessageSeverity}
          />
        </Box>
      </Modal> */}
    </Container>
  );
};

export default TableViewHistoricoEgresos;
