import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Components
import ExecutivePortfolioView from './ExecutivePortfolioView';
import ClientVendorPortfolioView from './ClientVendorPortfolioView';

class Portfolio extends Component {

componentDidMount(){ 
  this.props.dispatch({ type: 'GET_PORTFOLIO', payload: this.props.store.user?.company_fk })
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
        {this.props.store.user.admin ? <ExecutivePortfolioView/> : <ClientVendorPortfolioView/> }
      </>
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);