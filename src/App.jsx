import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f6fa',
    },
  },
});

const App = () => {
  const identifier = 'test@email.com';
  const password = 'Test123';

  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default App;
