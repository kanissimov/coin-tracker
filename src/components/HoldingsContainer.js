import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import MuiPaper from '@material-ui/core/Paper';

const Paper = styled(MuiPaper)`
  padding-bottom: 1.5rem;
`;

function PortfolioContainer({ children }) {
  return (
    <Grid item>
      <Paper>
        {children}
      </Paper>
    </Grid>
  )
}

export default PortfolioContainer;
