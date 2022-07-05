import React from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import {
  stylesContainerSection,
  stylesDateTable,
  stylesTableCell,
  stylesTableHead,
  stylesWidthFPago,
  stylesWidthHeightTable,
  stylesWidthPrice,
} from '@/pages/Reportes/IngresoBruto/IngresoBrutoStyles';

const TableViewIngresoBruto = ({ dateTable, dataSearch, dataPago, dataRegistro, loading, error }) => {
  let total = 0;
  let totalReservas = [];
  let totalRegistros = [];

  return (
    <Container component='section' sx={[stylesContainerSection, stylesWidthHeightTable]}>
      <TitlePage titlePage='Ingresos Brutos por Periodo' />
      <Typography sx={stylesDateTable}>{dateTable}</Typography>
      <Box component='div'>
        <TableContainer>
          <Table sx={stylesTableHead}>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                  Ingresos por Reservaciones (Anticipos)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
              {dataSearch.length !== 0
                ? dataPago.map(item => {
                    const { id, f_pago } = item;
                    total = 0;

                    dataSearch.map(item => {
                      const { cantidad, pago } = item;
                      const fpago = pago.f_pago;

                      if (f_pago === fpago) total = total + cantidad;
                    });

                    totalReservas.push({ formaPago: f_pago, total: total });

                    return (
                      <TableRow key={id}>
                        <TableCell sx={[stylesTableCell, stylesWidthFPago]}>Ingresos por {f_pago}</TableCell>
                        <TableCell sx={[stylesTableCell, stylesWidthPrice]}>
                          {total.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN',
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
          <Table sx={stylesTableHead}>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                  Ingresos por Registros
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
              {dataSearch.length !== 0
                ? dataPago.map(item => {
                    const { id, f_pago } = item;
                    total = 0;

                    dataRegistro.map(item => {
                      const { forma_pago, pagado } = item;

                      if (f_pago === forma_pago) total = total + pagado;
                    });

                    totalRegistros.push({ formaPago: f_pago, total: total });

                    return (
                      <TableRow key={id}>
                        <TableCell sx={[stylesTableCell, stylesWidthFPago]}>Ingresos por {f_pago}</TableCell>
                        <TableCell sx={[stylesTableCell, stylesWidthPrice]}>
                          {total.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN',
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                  Ingresos Totales
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                    <SleketonLoader />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell align='center' colSpan={2} sx={stylesTableCell}>
                    <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                  </TableCell>
                </TableRow>
              )}
              {dataSearch.length !== 0
                ? dataPago.map(item => {
                    const { id, f_pago } = item;
                    let total = 0;
                    let totalReg = 0;
                    let totalRes = 0;

                    totalReservas.map(item => {
                      const { formaPago, total } = item;

                      if (f_pago === formaPago) totalRes = total;
                    });

                    totalRegistros.map(item => {
                      const { formaPago, total } = item;

                      if (f_pago === formaPago) totalReg = total;
                    });

                    total = totalRes + totalReg;

                    return (
                      <TableRow key={id}>
                        <TableCell sx={[stylesTableCell, stylesWidthFPago]}>Ingresos totales por {f_pago}</TableCell>
                        <TableCell sx={[stylesTableCell, stylesWidthPrice]}>
                          {total.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN',
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TableViewIngresoBruto;
