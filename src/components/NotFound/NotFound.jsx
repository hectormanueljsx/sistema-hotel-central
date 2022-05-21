import React from 'react';
import { CssBaseline } from '@mui/material';

import '@/components/NotFound/NotFound.css';

const NotFound = () => {
  return (
    <section className='section-container'>
      <CssBaseline />
      <section className='section-text'>
        <h1 className='error-number'>404</h1>
        <h2 className='error-text'>Página no encontrada</h2>
      </section>
    </section>
  );
};

export default NotFound;
