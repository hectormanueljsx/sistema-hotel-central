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
  TableRow,
  TablePagination,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import ModalEgresos from '@/components/Reportes/Egresos/ModalEgresos';
import {
  stylesContainerSection,
  stylesDateTable,
  stylesModal,
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Reportes/Egresos/EgresosStyles';

const columns = [
  { id: 'fecha', label: 'Fecha', width: 164.95 },
  { id: 'concepto', label: 'Concepto', width: 242.917 },
  { id: 'subcategoria', label: 'Subcategoría', width: 184.95 },
  { id: 'formaPago', label: 'Forma de Pago', width: 173.933 },
  { id: 'importe', label: 'Importe', width: 109.983 },
  { id: 'acciones', label: 'Acciones', width: 75.2667 },
];

const TableViewEgresos = ({ dataSearch, dateTable, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataEgreso, setDataEgreso] = useState([]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpen = item => {
    setOpenModal(true);
    setDataEgreso(item);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Histórico de Egresos' />
      <Typography sx={stylesDateTable}>{dateTable}</Typography>
      <Box component='div'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={[stylesTableCell, { width: column.width }]}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCell}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCell}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
              {dataSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const { id, fecha, concepto, subcategoria, importe, pago } = item;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{moment(fecha).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
                    <TableCell sx={stylesTableCell}>{concepto}</TableCell>
                    <TableCell sx={stylesTableCell}>{subcategoria.descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>{pago.f_pago}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {importe.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCell}>
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
            count={dataSearch.length}
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
          <ModalEgresos dataEgreso={dataEgreso} handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </Container>
  );
};

export default TableViewEgresos;
