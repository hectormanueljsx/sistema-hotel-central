import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import CategoriaEgresos from '@/components/Caja/CategoriaEgresos/CategoriaEgresos';
import Egresos from '@/components/Caja/Egresos/Egresos';
import Mantenimiento from '@/components/Reportes/Mantenimiento/Mantenimiento';
import Tarifas from '@/components/Habitaciones/Tarifa/Tarifas';
import Habitaciones from '@/components/Habitaciones/Habitaciones/Habitaciones';
import Usuarios from '@/components/Administracion/Usuario/Usuarios';
import Navbar from '@/components/Navbar/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Login from '@/components/Login/Login';
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
              <CategoriaEgresos />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
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
          path='/reportes/mantenimiento'
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <Mantenimiento />
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
