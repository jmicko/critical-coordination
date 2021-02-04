import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Components
import ExecutivePortfolioView from './ExecutivePortfolioView';
import ClientVendorPortfolioView from './ClientVendorPortfolioView';

class Portfolio extends Component {
  state = {
    heading: 'Class Component',
   

  };

componentDidMount(){
  const company_fk = this.props.store.user.company_fk
  this.props.dispatch({ type: 'GET_PORTFOLIO', payload: 1 })
}

handleChange = name => {
  this.props.dispatch({ type: 'EDIT_PORTFOLIO', payload: name}); //this is not setup quite yet and is just a place holder for the moment
}

navigate = web_address => {
  this.props.history.push(web_address);
}

  render() {
    return (
      <>
        {JSON.stringify(this.props.store.user.company_fk)}
        {this.props.store.user.admin ? <ExecutivePortfolioView/> : <ClientVendorPortfolioView/> }
      </>
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);