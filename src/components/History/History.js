import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class History extends Component {
   state = {
   };

   componentDidMount(){
      this.props.dispatch( { type: 'FETCH_HISTORY'} )
   }

   render() {
      return (
         <center>
            <h2>History Page</h2>
         </center>
      );
   }
}

export default connect(mapStoreToProps)(History);
