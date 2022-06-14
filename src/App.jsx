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
import Login from '@/components/Login/Login';
import NotFound from '@/components/NotFound/NotFound';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f6fa',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path='/' />
        <Route path='/login' element={<Login />} />
        <Route path='/caja/categorias-de-egresos' element={<CategoriaEgresos />} />
        <Route path='/caja/egresos' element={<Egresos />} />
        <Route path='/reportes/mantenimiento' element={<Mantenimiento />} />
        <Route path='/habitaciones/tarifas' element={<Tarifas />} />
        <Route path='/habitaciones/habitaciones' element={<Habitaciones />} />
        <Route path='/administracion/usuarios' element={<Usuarios />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
