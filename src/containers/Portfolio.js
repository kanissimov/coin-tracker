import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { fetchMeta } from '../actions/coins';
import { fetchPrices } from '../actions/prices';
import { addHolding, updateHolding, removeHolding } from '../actions/holdings';
import { REFRESH_INTERVAL } from '../constants';
import { currency } from '../utils/formatter';
import { round } from '../utils/misc';
import TotalValue from '../components/TotalValue';
import CoinAvatar from '../components/CoinAvatar';
import EditDialog from '../components/EditDialog';

const Container = styled(Grid).attrs({
  container: true,
})`
  padding-top: 10vh;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddButtonWrapper = styled.div`
  padding: 1rem;
`;

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
// color: #fb8c00;

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

class Portfolio extends Component {
  state = {
    isEditing: false,
    editValues: null,
  };

  handleEditOpen = (editValues = null) => {
    this.setState({ editValues, isEditing: true });
  };

  handleEditCancel = () => {
    this.setState({ isEditing: false, editValues: null });
  };

  handleAdd = (params) => {
    this.props.addHolding(params);
    this.setState({ isEditing: false, editValues: null });
  };

  handleUpdate = (params) => {
    this.props.updateHolding(params);
    this.setState({ isEditing: false, editValues: null });
  };

  handleRemove = (symbol) => {
    this.props.removeHolding(symbol);
    this.setState({ isEditing: false, editValues: null });
  };

  componentDidMount() {
    this.props.fetchMeta();
    this.refresh();
    this.interval = setInterval(() => this.refresh(), REFRESH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refresh() {
    this.props.fetchPrices();
  }

  render() {
    const { coins, prices, holdings } = this.props;
    const total = holdings.reduce(
      (acc, e) => acc + round((e.quantity * prices[e.symbol]), 2), 0
    );
    const coinOptions = Object.keys(coins)
      // .filter(key => !holdings.find(e => e.symbol === key))
      .map(key => ({ label: `${key} - ${coins[key].name}`, value: key }));
    return (
      <Container>
        <EditDialog
          open={this.state.isEditing}
          values={this.state.editValues}
          onAdd={this.handleAdd}
          onUpdate={this.handleUpdate}
          onRemove={this.handleRemove}
          onClose={this.handleEditCancel}
          options={coinOptions}
        />
        <Grid item>
          <Paper>
            <Header>
              <AddButtonWrapper>
                <Button onClick={() => this.handleEditOpen()} variant="fab" mini color="default">
                  <AddIcon />
                </Button>
              </AddButtonWrapper>
              <TotalValue value={total} />
            </Header>
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
                        <IconButton onClick={() => this.handleEditOpen({ symbol, quantity })}>
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
          </Paper>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ coins, prices, holdings, ui }) {
  return {
    coins,
    prices,
    holdings,
    ui,
  };
}

export default connect(mapStateToProps, {
  fetchMeta,
  fetchPrices,
  addHolding,
  updateHolding,
  removeHolding,
})(Portfolio);
