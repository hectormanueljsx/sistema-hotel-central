import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Sección de Caja
import CategoriaEgresos from '@/components/Caja/CategoriaEgresos/CategoriaEgresos';
// Sección de Habitaciones
import Tarifas from '@/components/Habitaciones/Tarifa/Tarifas';
import Usuarios from '@/components/Habitaciones/Usuario/Usuarios';

import Navbar from '@/components/Navbar/Navbar';
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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/caja/categoria-egresos' element={<CategoriaEgresos />} />
          <Route path='/habitaciones/tarifas' element={<Tarifas />} />
          <Route path='/habitaciones/habitaciones' />
          <Route path='/habitaciones/usuarios' element={<Usuarios />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
