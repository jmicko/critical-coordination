import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Components
import ExecutivePortfolioView from './ExecutivePortfolioView';
import ClientVendorPortfolioView from './ClientVendorPortfolioView';

class Portfolio extends Component {

  render() {
    // console.log(this.props);
    return (
      <>      
        { (this.props.store.user.user_type === "admin") ? <ExecutivePortfolioView history={this.props.history}/> : <ClientVendorPortfolioView history={this.props.history}/> }
      </>
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);