import React, { useEffect, useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';

import TitlePage from '@/components/Title/TitlePage';
import Loader from '@/components/Loader/Loader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import useGetGeneralTable from '@/hooks/useGetGeneralTable';
import deleteGeneralTable from '@/services/deleteGeneralTable';
import { historicalEndpoints, generalEndpoints } from '@/utilities/endpoints';
import {
  stylesContainerSection,
  stylesModal,
  stylesTableCell,
  stylesWidthHeightTable,
} from '@/components/Reportes/IngresoBruto/IngresoBrutoStyles';

const TableViewIngresoBruto = ({ dataSearch, dataPago, dataRegistro, status, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  let total = 0;
  let totalReservas = [];
  let totalRegistros = [];

  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container component='section' sx={[stylesContainerSection, { width: 1000 }]}>
      <CssBaseline />
      <TitlePage titlePage='Ingresos Brutos por Periodo' />
      <Box component='div'>
        {loading && <Loader />}
        {error && <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />}
        <TableContainer>
          <Table>
            <TableHead sx={{ marginBottom: 5 }}>
              <TableRow>
                {loading || error ? null : (
                  <TableCell align='center' colSpan={2} sx={[stylesTableCell]}>
                    Ingresos por Reservaciones (Anticipos)
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPago.map(item => {
                total = 0;
                const { id, f_pago } = item;
                dataSearch.map(item => {
                  const { cantidad, pago } = item;
                  const fpago = pago.f_pago;
                  if (f_pago === fpago) {
                    total = total + cantidad;
                  }
                });
                totalReservas.push({ formaPago: f_pago, total: total });

                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>Ingresos por {f_pago}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {total.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Table>
            <TableHead sx={{ marginBottom: 5 }}>
              <TableRow>
                {loading || error ? null : (
                  <TableCell align='center' colSpan={2} sx={[stylesTableCell]}>
                    Ingreso por Registros
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPago.map(item => {
                total = 0;
                const { id, f_pago } = item;
                dataRegistro.map(item => {
                  const { forma_pago, pagado } = item;
                  if (f_pago === forma_pago) {
                    total = total + pagado;
                  }
                });
                totalRegistros.push({ formaPago: f_pago, total: total });
                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>Ingresos por {f_pago}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {total.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Table>
            <TableHead sx={{ marginBottom: 5 }}>
              <TableRow>
                {loading || error ? null : (
                  <TableCell align='center' colSpan={2} sx={[stylesTableCell]}>
                    Ingresos Totales
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPago.map(item => {
                let total = 0;
                let totalReg = 0;
                let totalRes = 0;
                const { id, f_pago } = item;
                totalReservas.map(item => {
                  const { formaPago, total } = item;
                  if (f_pago === formaPago) {
                    totalRes = total;
                  }
                });
                totalRegistros.map(item => {
                  const { formaPago, total } = item;
                  if (f_pago === formaPago) {
                    totalReg = total;
                  }
                });
                total = totalRes + totalReg;
                console.log(total);
                return (
                  <TableRow key={id}>
                    <TableCell sx={stylesTableCell}>Ingresos totales por {f_pago}</TableCell>
                    <TableCell sx={stylesTableCell}>
                      {total.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewIngresoBruto;
