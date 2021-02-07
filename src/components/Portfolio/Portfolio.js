import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Components
import ExecutivePortfolioView from './ExecutivePortfolioView';
import ClientVendorPortfolioView from './ClientVendorPortfolioView';

class Portfolio extends Component {

  render() {
    return (
      <>      
        { (this.props.store.user.user_type === "admin") ? <ExecutivePortfolioView/> : <ClientVendorPortfolioView/> }
      </>
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);