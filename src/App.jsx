import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import HomeDashboard from '@/pages/Dashboard/HomeDashboard/HomeDashboard';
import Registros from '@/pages/Dashboard/Registros/Registros';
import HistoricoReservaciones from '@/pages/Reservas/HistoricoReservaciones/HistoricoReservaciones';
import IntercambiarReservacion from './pages/Reservas/IntercambiarReservacion/IntercambiarReservacion';
import HistoricoRegistro from '@/pages/Reservas/HistoricoRegistro/HistoricoRegistro';
import Empresa from '@/pages/Reservas/Empresa/Empresa';
import EmpresaClientes from '@/pages/Reservas/EmpresaClientes/EmpresaClientes';
import CategoriaEgresos from '@/pages/Caja/CategoriaEgresos/CategoriaEgresos';
import Egresos from '@/pages/Caja/Egresos/Egresos';
import HistoricoDeGastos from '@/pages/Caja/HistoricoEgresos/HistoricoEgresos';
import Anticipo from '@/pages/Reportes/Anticipo/Anticipo';
import Gastos from '@/pages/Reportes/Egresos/Egresos';
import IngresoBruto from '@/pages/Reportes/IngresoBruto/IngresoBruto';
import HabitacionSaldoPendiente from '@/pages/Reportes/HabitacionSaldoPendiente/HabitacionSaldoPendiente';
import ReportesMantenimiento from '@/pages/Reportes/Fallas/Fallas';
import Tarifas from '@/pages/Habitaciones/Tarifa/Tarifas';
import Habitaciones from '@/pages/Habitaciones/Habitaciones/Habitaciones';
import Mantenimiento from '@/pages/Mantenimiento/Mantenimiento/Mantenimiento';
import Usuarios from '@/pages/Administracion/Usuario/Usuarios';
import Login from '@/pages/Login/Login';
import Navbar from '@/components/Navbar/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import NotFound from '@/components/NotFound/NotFound';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f6fa',
    },
  },
});

const ROLES = {
  ADMINISTRADOR: 'Administrador',
  RECEPCIONISTA: 'Recepcionista',
  ENCARGADO: 'Encargado',
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <HomeDashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route
          path='/reservas/detalles-reservacion'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Registros />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reservas/historico-de-reservaciones'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <HistoricoReservaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reservas/intercambiar-reservacion'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <IntercambiarReservacion />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reservas/historico-de-registros'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <HistoricoRegistro />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reservas/empresas'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Empresa />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reservas/empresas/:rfc'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <EmpresaClientes />
            </ProtectedRoute>
          }
        />
        <Route
          path='/caja/categorias-de-egresos'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <CategoriaEgresos />
            </ProtectedRoute>
          }
        />
        <Route
          path='/caja/egresos'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Egresos />
            </ProtectedRoute>
          }
        />
        <Route
          path='/caja/historico-de-gastos'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <HistoricoDeGastos />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reportes/anticipos-por-periodo'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Anticipo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reportes/gastos'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Gastos />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reportes/ingresos-brutos'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <IngresoBruto />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reportes/habitaciones-saldo-pendiente'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <HabitacionSaldoPendiente />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reportes/mantenimiento'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <ReportesMantenimiento />
            </ProtectedRoute>
          }
        />
        <Route
          path='/habitaciones/tarifas'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Tarifas />
            </ProtectedRoute>
          }
        />
        <Route
          path='/habitaciones/habitaciones'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Habitaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path='/mantenimiento/mantenimiento'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Mantenimiento />
            </ProtectedRoute>
          }
        />
        <Route
          path='/administracion/usuarios'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
