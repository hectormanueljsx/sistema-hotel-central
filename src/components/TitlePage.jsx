import React from 'react';
import { Typography } from '@mui/material';

const TitlePage = ({ titlePage }) => {
  return (
    <Typography component='h2' sx={{ fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 3 }}>
      {titlePage}
    </Typography>
  );
};

export default TitlePage;
