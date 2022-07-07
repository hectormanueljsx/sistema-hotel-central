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
import ModalEgresos from '@/pages/Reportes/Egresos/ModalEgresos';
import {
  stylesContainerSection,
  stylesDateTable,
  stylesModal,
  stylesTableCellHeader,
  stylesTableCellBody,
  stylesWidthHeightTable,
} from '@/pages/Reportes/Egresos/EgresosStyles';

const columns = [
  { id: 'fecha', label: 'Fecha', width: 94.98 },
  { id: 'formaPago', label: 'Forma de Pago', width: 173.94 },
  { id: 'subcategoria', label: 'Subcategoría', width: 179.95 },
  { id: 'importe', label: 'Importe', width: 99.98 },
  { id: 'concepto', label: 'Concepto', width: 227.9 },
  { id: 'user', label: 'Usuario', width: 99.98 },
  { id: 'acciones', label: 'Acciones', width: 75.29 },
];

const TableViewEgresos = ({ dataSearch, dateTable, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataEgreso, setDataEgreso] = useState([]);

  let totalImporte = 0;

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
              {dataSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                const { id, fecha, concepto, subcategoria, importe, pago, users_permissions_user } = item;

                totalImporte += importe;

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCellBody}>{moment(fecha).format('YYYY-MM-DD hh:mm:ss')}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{pago.f_pago}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{subcategoria.descripcion}</TableCell>
                    <TableCell sx={stylesTableCellBody}>
                      {importe.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCellBody}>{concepto}</TableCell>
                    <TableCell sx={stylesTableCellBody}>{users_permissions_user.username}</TableCell>
                    <TableCell sx={stylesTableCellBody}>
                      <IconButton color='info' size='small' onClick={() => handleOpen(item)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {totalImporte === 0 ? null : (
                <>
                  <br />
                  <TableRow>
                    <TableCell sx={[stylesTableCellBody, { fontWeight: '500' }]}>Total</TableCell>
                    <TableCell sx={stylesTableCellBody}></TableCell>
                    <TableCell sx={stylesTableCellBody}></TableCell>
                    <TableCell sx={stylesTableCellBody}>
                      {totalImporte.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell sx={stylesTableCellBody}></TableCell>
                    <TableCell sx={stylesTableCellBody}></TableCell>
                    <TableCell sx={stylesTableCellBody}></TableCell>
                  </TableRow>
                </>
              )}
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
