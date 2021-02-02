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

componentDidMount(){
  this.props.dispatch({ type: 'GET_PORTFOLIO', payload: this.props.store.user.id})
}


handleChange = name => {
  this.props.dispatch({ type: 'EDIT_PORTFOLIO', payload: name}); //this is not setup quite yet and is just a place holder for the moment
}


  render() {
    let {user} = 1; // we will make this a call to the redux and the user.id store like this.props.store.user.id. will want to double check how this works
    return (
      <div>
        <h2>Portfolio Page</h2>


        {/* Conditioal rendering, if the user it Tom and has the user ID  admin we will get him the ability to edit and make changes to the files. */}
        if( user = 1 ) {
          <input onChange={ () => this.handleChange('EDITABLE')}/>
        }else{
          <h2>This is not going to editable for other users</h2> 
        }





      </div>
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);