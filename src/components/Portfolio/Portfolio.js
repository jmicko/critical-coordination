import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Components
import ExecutivePortfolioView from './ExecutivePortfolioView';
import ClientVendorPortfolioView from './ClientVendorPortfolioView';
import ContractorPortfolioView from './ContractorPortfolioView';

class Portfolio extends Component {

  render() {
    // console.log(this.props);
    return (
      <>      
        {this.props.store.user.user_type === "admin" && 
         <ExecutivePortfolioView history={this.props.history}/> }
        {this.props.store.user.user_type === "client" &&
        <ClientVendorPortfolioView history={this.props.history}/> }
        {/* need to create a contractor portal view to let them see their jobs and tasks and replace the below component with that*/}
        {this.props.store.user.user_type === "contractor"  &&
        <ContractorPortfolioView history={this.props.history}/>}
      </>
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);