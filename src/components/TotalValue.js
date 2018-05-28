import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { fixed } from '../utils/formatter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
`;

const CurrencySign = styled(Typography).attrs({
  variant: 'display1'
})`
  &&& {
    font-size: 1.2rem;
    color: grey;
    padding-top: .3rem;
  }
`;

const Label = styled(Typography).attrs({
  variant: 'subheading'
})`
  &&& {
    font-size: 1rem;
    font-weight: 500;
    color: #aaaaaa;
  }
`;

const Value = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Amount = styled(Typography).attrs({
  variant: 'display1'
})`
`;

function TotalValue({ value }) {
  return (
    <Wrapper>
      <Label>Total portfolio value</Label>
      <Value>
        <CurrencySign>$</CurrencySign>
        <Amount>{value ? fixed.format(value) : ''}</Amount>
      </Value>
    </Wrapper>
  );
}

export default TotalValue;
