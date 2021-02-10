import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class TrackingApi extends Component {
   state = {
   };

   componentDidMount(){
     // this.props.dispatch( {type: 'GET_TRACKING_DATA' })
   }

   getTracking = () => {
      const tracking_data = {
         url: 'https://api.goshippo.com/tracks/',
         carrier: 'fedex',
         tracking_number: '783275757626',
         token: 'ShippoToken shippo_live_fdafef3163b3e143001cbaf1ffe000b8d7b82c1e'
      }
      this.props.dispatch( {type: 'GET_TRACKING_DATA', payload: tracking_data})
   }

   render() {
      return (
         <div>
            <h2>Tracking Status</h2>
            <button onClick={this.getTracking}>Test</button>
         </div>
      );
   }
}

export default connect(mapStoreToProps)(TrackingApi);
