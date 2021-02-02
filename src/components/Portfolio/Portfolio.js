import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name Portfolio with the name for the new
// component.
class Portfolio extends Component {
  state = {
    heading: 'Class Component',
  };




  render() {
    let {user} = this.props.store.user.id; 
    return (
      <div>
        <h2>Portfolio Page</h2>

        if( user = 1 ) {
          <input value= {this.props.store.portfolio} onChange={this.handleChange('name')}></input>
        }else{
          <h2>{this.props.store.portfolio}</h2>
        }




      </div>
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);