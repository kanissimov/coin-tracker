import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TotalValue from './TotalValue';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddButtonWrapper = styled.div`
  padding: 1rem;
`;

function PortfolioHeader({ total, onEdit }) {
  return (
    <Header>
      <AddButtonWrapper>
        <Button onClick={() => onEdit()} variant="fab" mini color="default">
          <AddIcon />
        </Button>
      </AddButtonWrapper>
      <TotalValue value={total} />
    </Header>
  );
}

export default PortfolioHeader;
