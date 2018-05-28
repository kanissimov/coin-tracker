import React, { Component } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MuiFormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const DialogActions = styled(MuiDialogActions)`
  &&& {
    padding: 1rem;
  }
`;

const Select = styled(MuiSelect)`
  &&& {
    min-width: 15rem;
  }
`;

const FormControl = styled(MuiFormControl)`
  &&& {
    min-width: 10rem;
    &:first-child {
      margin-right: 2rem;
    }
  }
`;

class EditDialog extends Component {
  state = { symbol: '', quantity: '', errors: {} };

  componentWillReceiveProps(nextProps) {
    const { values } = nextProps;
    if (values !== this.props.values) {
      this.clearState();
      if (values) {
        this.setState(values);
      }
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const { errors } = this.state;
    delete errors[name];
    this.setState({ errors });
  };

  handleClose = () => {
    this.props.onClose();
    this.setState({ symbol: '', quantity: '' })
  };

  handleRemove = () => {
    this.props.onRemove(this.state.symbol);
    this.setState({ symbol: '', quantity: '' })
  };

  handleAdd = () => {
    if (!this.validate()) return;
    const { symbol, quantity } = this.state;
    this.props.onAdd({ symbol, quantity: Number.parseFloat(quantity) });
    this.setState({ symbol: '', quantity: '' })
  };

  handleUpdate = () => {
    if (!this.validate()) return;
    const { symbol, quantity } = this.state;
    this.props.onUpdate({ symbol, quantity: Number.parseFloat(quantity) });
    this.setState({ symbol: '', quantity: '' })
  };

  validate = () => {
    const { symbol, quantity, errors } = this.state;
    let isValid = true;
    if (!symbol) {
      errors.symbol = 'Required';
      isValid = false;
    } else {
      delete errors.symbol;
    }
    if (!quantity || isNaN(quantity) || !(quantity > 0)) {
      errors.quantity = 'Positive number required';
      isValid = false;
    } else {
      delete errors.quantity;
    }
    this.setState({ errors });
    return isValid;
  }

  clearState = () => {
    this.setState({ symbol: '', quantity: '', errors: {} });
  }

  render() {
    const { open, options, values } = this.props;
    const adding = !values;
    const { symbol, quantity, errors } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
      >
        <DialogTitle>{adding ? 'Add holding' : 'Update holding'}</DialogTitle>
        <DialogContent>
          <FormControl error={!!errors.symbol}>
            <InputLabel>Coin</InputLabel>
            <Select
              value={symbol}
              onChange={this.handleChange}
              inputProps={{ name: 'symbol' }}
              disabled={!adding}
            >
             {options.map(e => (
               <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
             ))}
            </Select>
            <FormHelperText>{errors.symbol}</FormHelperText>
          </FormControl>
          <FormControl error={!!errors.quantity}>
            <InputLabel>Quantity</InputLabel>
            <Input
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
              autoFocus={!adding}
            />
            <FormHelperText>{errors.quantity}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={this.handleClose} color="default">
            Cancel
          </Button>
          {adding &&
            <Button variant="outlined" onClick={this.handleAdd} color="primary">
              Add
            </Button>
          }
          {!adding &&
            <Button variant="outlined" onClick={this.handleUpdate} color="primary">
              Update
            </Button>
          }
          {!adding &&
            <Button variant="outlined" onClick={this.handleRemove} color="secondary">
              Remove
            </Button>
          }
        </DialogActions>

      </Dialog>
    );
  }
}

export default EditDialog;
