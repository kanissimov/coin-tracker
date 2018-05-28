import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const Container = styled(Grid).attrs({
  container: true,
})`
  padding-top: 10vh;
  justify-content: center;
`;

function PortfolioContainer({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default PortfolioContainer;
