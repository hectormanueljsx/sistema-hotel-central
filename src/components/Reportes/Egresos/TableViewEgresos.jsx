import React, { useState } from 'react';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';

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
  TableRow,
  TablePagination,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import TitlePage from '@/components/Title/TitlePage';
import Loader from '@/components/Loader/Loader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Reportes/Egresos/EgresosStyles';
import ModalEgresos from './ModalEgresos';

const columns = [
  { id: 'fecha', label: 'Fecha', width: 200 },
  { id: 'formaPago', label: 'Forma de Pago', width: 200 },
  { id: 'subcategoria', label: 'Subcategoria', width: 200 },
  { id: 'importe', label: 'Importe', width: 112 },
  { id: 'concepto', label: 'Concepto', width: 200 },
  { id: 'user', label: 'Usuario', width: 200 },
  { id: 'detalle', label: 'Detalles', width: 200 },
];

const TableViewEgresos = ({ dataSearch, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataEgreso, setDataEgreso] = useState([]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpen = item => {
    setOpenModal(true);
    setDataEgreso(item);
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container component='section' disableGutters sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <CssBaseline />
      <TitlePage titlePage='Historico de Egresos' />
      <ReactHtmlTableToExcel
        id='botton'
        table='tableEgreso'
        filename='Reporte de Egresos'
        sheet='pagina1'
        buttonText='Exportar'
      />
      <Box component='div'>
        {loading && <Loader />}
        {error && <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />}
        <TableContainer>
          <Table id='tableEgreso'>
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
              {dataSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const { id, fecha, concepto, subcategoria, importe, pago, users_permissions_user } = item;
                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>{fecha}</TableCell>
                    <TableCell sx={stylesTableCell}>{pago.f_pago}</TableCell>
                    <TableCell sx={stylesTableCell}>{subcategoria.descripcion}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {importe.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCell}>{concepto}</TableCell>
                    <TableCell sx={stylesTableCell}>{users_permissions_user.username}</TableCell>
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
