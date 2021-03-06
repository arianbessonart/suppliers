import React from 'react'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import {DatePicker, TextField} from 'material-ui';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router'

import {getAll, getFilter, getFilteredList} from '../selectors/invoice';
import {fetchInvoicesAction, chargeInvoiceAction, filterInvoicesAction} from '../actions/invoice';

import InvoiceList from './components/invoiceList'

class InvoiceHome extends React.Component {

  componentDidMount() {
    this.props.fetchInvoices();
  }

  render() {
    let invoiceIdSelected = null;

    const handleOnCharge = (invoiceId) => {
      invoiceIdSelected = invoiceId;
      this.refs.dp.openDialog();
    };

    const handleChargeDate = (e, date) => {
      this.props.chargeInvoice(invoiceIdSelected, date);
    };

    const style = {
      marginRight: 20,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed'
    };

    let {invoices, handleFilter, filter} = this.props;
    return (
      <div>
        <div style={{width: "400px", marginRight:"auto", marginLeft:"auto"}}>
          <TextField floatingLabelText="Filter"
                     name="filter"
                     value={filter}
                     onChange={(e, val) => handleFilter(val)}
                     fullWidth={true}
          />
        </div>
        <InvoiceList invoices={invoices} onCharge={handleOnCharge} />
        <Link to={`/invoices/new`}>
          <FloatingActionButton style={style}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <DatePicker ref='dp' style={{display: "None"}} name="chargeDp" onChange={handleChargeDate} />
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInvoices: () => {
      dispatch(fetchInvoicesAction())
    },
    chargeInvoice: (id, date) => {
      dispatch(chargeInvoiceAction(id, date))
    },
    handleFilter: (val) => {
      dispatch(filterInvoicesAction(val))
    }
  }
};

// Using selector
const mapStateToProps = (state) => {
  return {
    // invoices: getAll(state),
    invoices: getFilteredList(state),
    filter: getFilter(state),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceHome);
