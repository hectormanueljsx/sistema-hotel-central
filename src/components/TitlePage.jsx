import React from 'react';
import { Typography } from '@mui/material';

import { stylesTitlePage } from './stylesGlobals';

const TitlePage = ({ titlePage }) => {
  return (
    <Typography component='h2' sx={stylesTitlePage}>
      {titlePage}
    </Typography>
  );
};

export default TitlePage;
