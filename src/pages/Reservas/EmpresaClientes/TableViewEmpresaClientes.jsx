import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';

import TitlePage from '@/components/Title/TitlePage';
import LoaderSkeleton from '@/components/Loader/LoaderSkeleton';
import AlertGlobalTables from '@/components/Alert/AlertGlobalTables';
import useGetSpecific from '@/hooks/useGetSpecific';
import { messageEmptyGetData, messageErrorGetData } from '@/utilities/messagesAlerts';
import { generalEndpoints } from '@/utilities/endpoints';
import {
  stylesTableCellBody,
  stylesTableCellHeader,
  stylesWidthHeightTable,
  stylesWrapperBoxShadow,
} from '@/pages/Reservas/EmpresaClientes/EmpresaClientesStyles';

const columns = [
  { id: 'nombre', label: 'Nombre del Cliente', width: 500 },
  { id: 'email', label: 'Correo Electrónico', width: 366 },
  { id: 'numero', label: 'Teléfono', width: 120 },
];

const TableViewEmpresaClientes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const endpointCliente = generalEndpoints.cliente;
  const attribute = 'empresa';

  const { id } = useParams();
  const { listGetSpecific, loadingGetSpecific, errorGetSpecific } = useGetSpecific(endpointCliente, attribute, id);

  const nameEmpresa =
    listGetSpecific?.length > 0
      ? listGetSpecific?.map(item => {
          const {
            empresa: { nombre },
          } = item;
          return nombre;
        })
      : '';

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component='section' sx={[stylesWrapperBoxShadow, stylesWidthHeightTable]}>
      <TitlePage
        titlePage={
          listGetSpecific?.length > 0
            ? `Lista de Clientes Relacionados a ${nameEmpresa[0]}`
            : `Lista de Clientes Relacionados`
        }
      />
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
              {loadingGetSpecific ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <LoaderSkeleton />
                  </TableCell>
                </TableRow>
              ) : errorGetSpecific ? (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageErrorGetData} />
                  </TableCell>
                </TableRow>
              ) : listGetSpecific?.length > 0 ? (
                listGetSpecific?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(item => {
                  const { id, nombre, mail, tel } = item;

                  return (
                    <TableRow key={id}>
                      <TableCell sx={stylesTableCellBody}>{nombre}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{mail}</TableCell>
                      <TableCell sx={stylesTableCellBody}>{tel}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length} sx={stylesTableCellBody}>
                    <AlertGlobalTables messageError={messageEmptyGetData} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {loadingGetSpecific ? null : (
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={listGetSpecific?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        )}
      </Box>
    </Box>
  );
};

export default TableViewEmpresaClientes;
