import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name Task with the name for the new
// component.
class Task extends Component {
  

    navigate = web_address => {
        this.props.history.push(web_address);
      }




  render() {
    return (
      <div>
        <h2>Task Page</h2>
        <button onClick={ () => this.navigate('/portfolio') } >Button to the portfolio page</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Task);