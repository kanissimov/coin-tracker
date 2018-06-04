import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TotalValue from './TotalValue';
import logo from '../assets/coin-tracker.png';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const AddButtonWrapper = styled.div`
  padding-top: 1.2rem;
  padding-left: 1.3rem;
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 7.5rem;
  top: .6rem;
  img {
    width: 8rem;
  }
`;

function PortfolioHeader({ total, onEdit }) {
  return (
    <Header>
      <LogoWrapper>
        <img src={logo} alt="coin tracker" />
      </LogoWrapper>
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
