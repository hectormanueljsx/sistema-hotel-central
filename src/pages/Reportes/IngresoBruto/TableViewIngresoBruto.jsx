import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import TitlePage from '@/components/Title/TitlePage';
import SleketonLoader from '@/components/Loader/SleketonLoader';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import {
  stylesDateTable,
  stylesGridTables,
  stylesTableCellBody,
  stylesTableCellHeader,
  stylesTableCellTitle,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Reportes/IngresoBruto/IngresoBrutoStyles';

const columns = [
  { id: 'f_pago', label: 'Forma de Pago', width: 830 },
  { id: 'cantidad', label: 'Cantidad', width: 156 },
];

const TableViewIngresoBruto = ({ dateTable, dataSearch, dataPago, dataRegistro, loading, error }) => {
  let total = 0;
  let totalReservas = [];
  let totalRegistros = [];

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage titlePage='Lista de Ingresos Brutos por Periodo' />
      <Typography component='p' sx={stylesDateTable}>
        {dateTable}
      </Typography>
      <Box component='div'>
        <Box component='div' sx={stylesGridTables}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellTitle}>
                    Ingresos por Reservaciones (Anticipos)
                  </TableCell>
                </TableRow>
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
                      <SleketonLoader />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                      <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                    </TableCell>
                  </TableRow>
                ) : dataSearch.length > 0 ? (
                  dataPago.map(item => {
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
                        <TableCell sx={stylesTableCellBody}>Ingresos por {f_pago}</TableCell>
                        <TableCell sx={stylesTableCellBody}>
                          {total.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN',
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                      <AlertGlobalTables messageError='No se encontraron datos para esta tabla' />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellTitle}>
                    Ingresos por Registros
                  </TableCell>
                </TableRow>
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
                      <SleketonLoader />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                      <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                    </TableCell>
                  </TableRow>
                ) : dataSearch.length > 0 ? (
                  dataPago.map(item => {
                    const { id, f_pago } = item;
                    total = 0;

                    dataRegistro.map(item => {
                      const { forma_pago, pagado } = item;

                      if (f_pago === forma_pago) total = total + pagado;
                    });

                    totalRegistros.push({ formaPago: f_pago, total: total });

                    return (
                      <TableRow key={id}>
                        <TableCell sx={stylesTableCellBody}>Ingresos por {f_pago}</TableCell>
                        <TableCell sx={stylesTableCellBody}>
                          {total.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN',
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                      <AlertGlobalTables messageError='No se encontraron datos para esta tabla' />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellTitle}>
                    Ingresos Totales
                  </TableCell>
                </TableRow>
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
                      <SleketonLoader />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                      <AlertGlobalTables messageError='Ah ocurrido un error al obtener los datos' />
                    </TableCell>
                  </TableRow>
                ) : dataSearch.length > 0 ? (
                  dataPago.map(item => {
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
                        <TableCell sx={stylesTableCellBody}>Ingresos totales por {f_pago}</TableCell>
                        <TableCell sx={stylesTableCellBody}>
                          {total.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN',
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                      <AlertGlobalTables messageError='No se encontraron datos para esta tabla' />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default TableViewIngresoBruto;
