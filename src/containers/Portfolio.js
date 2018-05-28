import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { fetchMeta } from '../actions/coins';
import { fetchPrices } from '../actions/prices';
import { addHolding, updateHolding, removeHolding } from '../actions/holdings';
import { round } from '../utils/misc';
import EditDialog from '../components/EditDialog';
import HoldingsTable from '../components/HoldingsTable';
import PortfolioHeader from '../components/PortfolioHeader';
import PortfolioContainer from '../components/PortfolioContainer';
import { REFRESH_INTERVAL } from '../constants';

class Portfolio extends Component {
  state = { isEditing: false, editValues: null };

  handleEditOpen = (editValues = null) => {
    this.setState({ editValues, isEditing: true });
  };

  handleEditCancel = () => {
    this.clearState();
  };

  handleAdd = (params) => {
    this.props.addHolding(params);
    this.clearState();
  };

  handleUpdate = (params) => {
    this.props.updateHolding(params);
    this.clearState();
  };

  handleRemove = (symbol) => {
    this.props.removeHolding(symbol);
    this.clearState();
  };

  clearState = () => {
    this.setState({ isEditing: false, editValues: null });
  }

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
      <PortfolioContainer>
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
            <PortfolioHeader total={total} onEdit={this.handleEditOpen} />
            <HoldingsTable
              holdings={holdings}
              coins={coins}
              prices={prices}
              onEdit={this.handleEditOpen}
            />
          </Paper>
        </Grid>
      </PortfolioContainer>
    );
  }
}

function mapStateToProps({ coins, prices, holdings }) {
  return {
    coins,
    prices,
    holdings,
  };
}

export default connect(mapStateToProps, {
  fetchMeta,
  fetchPrices,
  addHolding,
  updateHolding,
  removeHolding,
})(Portfolio);
