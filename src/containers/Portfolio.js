import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { fetchMeta } from '../actions/coins';
import { fetchPrices } from '../actions/prices';
import { addHolding, updateHolding, removeHolding } from '../actions/holdings';
import { REFRESH_INTERVAL } from '../constants';
import { round } from '../utils/misc';
import TotalValue from '../components/TotalValue';
import EditDialog from '../components/EditDialog';
import HoldingsTable from '../components/HoldingsTable';

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
            <HoldingsTable
              holdings={holdings}
              coins={coins}
              prices={prices}
              onEdit={this.handleEditOpen}
            />
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
