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

navigate = web_address => {
  this.props.history.push(web_address);
}




  render() {
    let user = 1; // we will make this a call to the redux and the user.id store like this.props.store.user.id. will want to double check how this works
    
    if( user == 1  ){
      return( <div>
      <h1>hello this is the admin stuff</h1>

      <button onClick={ () => this.navigate('/task') } >Button to the task page</button>
      

      </div>
      )
    }



    {/* Conditioal rendering, if the user it Tom and has the user ID  admin we will get him the ability to edit and make changes to the files. */}
       
    if( 1 === 2 ) {
      return(
      <h2>Go Away this is going to be the cleint stuff</h2>
      )
    }
    
    return (
      <div>
        <h2>Portfolio Page</h2>


        
        





      </div>
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);