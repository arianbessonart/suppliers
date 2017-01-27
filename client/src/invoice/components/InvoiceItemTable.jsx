import React from 'react'
import { connect } from 'react-redux'
import {TextField, FlatButton} from 'material-ui';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

import {getNewInvoice} from '../../selectors/invoice'
import {addItemInvoiceAction, changeAmountItemInvoiceAction, changeDetailItemInvoiceAction, deleteItemInvoiceAction} from '../../actions/invoice'

class InvoiceItemTable extends React.Component {

  componentDidMount() {
  }

  render() {
    let { invoice, addItem, changeProductAmount, changeItemDetail, deleteItem} = this.props;
    console.log(invoice.items);
    let items = invoice.items.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn style={{width: "70%"}}>
            <TextField fullWidth={true} label={val.detail} id={String(index)} key={index} onChange={ (e, val) => changeItemDetail(index, val)} />
          </TableRowColumn>
          <TableRowColumn style={{width: "20%"}}>
            <TextField fullWidth={true} label={val.amount} id={String(index)} key={index} onChange={ (e, val) => changeProductAmount(index, val)} />
          </TableRowColumn>
          <TableRowColumn style={{width: "10%"}}>
            <IconButton iconClassName="material-icons" onClick={() => deleteItem(index)}>delete</IconButton>
          </TableRowColumn>
        </TableRow>)
    });
    return (
      <div>
        <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={{width: "70%"}}>Detail</TableHeaderColumn>
              <TableHeaderColumn style={{width: "20%"}}>Amount</TableHeaderColumn>
              <TableHeaderColumn style={{width: "10%"}}>{items.length} Item{items.length > 1 ? 's' : ''}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {items}
          </TableBody>
        </Table>
        <FlatButton label="Add product" onClick={addItem} />

      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: () => {
      dispatch(addItemInvoiceAction({detail: "", amount: 0}));
    },
    changeProductAmount: (index, val) => {
      dispatch(changeAmountItemInvoiceAction(index, val));
    },
    changeItemDetail: (index, val) => {
      dispatch(changeDetailItemInvoiceAction(index, val));
    },
    deleteItem: (index) => {
      dispatch(deleteItemInvoiceAction(index));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    invoice: getNewInvoice(state)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceItemTable);