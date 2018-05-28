import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MuiIconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { currency } from '../utils/formatter';
import CoinAvatar from './CoinAvatar';

const TableCell = styled(MuiTableCell)`
  &&& {
    font-size: 1rem;
  }
`;

const TableHead = styled(MuiTableHead)`
  th {
    color: #aaaaaa;
  }
`
const IconButton = styled(MuiIconButton)`
  &&& {
    width: 2rem;
    height: 2rem;
    margin-top: -.2rem
    margin-right: -2rem;
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

function HoldingsTable({ holdings, prices, coins, onEdit }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell numeric>Quantity</TableCell>
          <TableCell numeric>Price (USD)</TableCell>
          <TableCell numeric>Value (USD)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {holdings.map(({ symbol, quantity }) => {
          const coin = coins[symbol] || {};
          const price = prices[symbol] || 0;
          const value = quantity * price;
          return (
            <TableRow key={symbol}>
              <TableCell>
                <CoinAvatar symbol={symbol} icon={coin.icon} />
              </TableCell>
              <TableCell>{coin.name}</TableCell>
              <TableCell numeric>
                {quantity}
                <IconButton onClick={() => onEdit({ symbol, quantity })}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell numeric>{currency.format(price)}</TableCell>
              <TableCell numeric>{currency.format(value)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}

export default HoldingsTable;
