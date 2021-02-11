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
      if(this.props.tracking_number){
         if(this.props.tracking_number.substring(0, 2) == '1z') {
            const tracking_data = {
               carrier: 'ups',
               tracking_number: this.props.tracking_number
            }
         } else {
            const tracking_data = {
               carrier: 'fedex',
               tracking_number: '783275757626' //this.props.tracking_number
            }
            this.props.dispatch( {type: 'GET_TRACKING_DATA', payload: tracking_data})
         }
      }
   }

   render() {
      return (
         <div>
            <h4>Tracking Status</h4>
            {this.props.tracking_number ? 
            <>
            <p>ETA: {this.props.store.trackingReducer.eta}</p>
            <p>Status Details: {this.props.store.trackingReducer?.tracking_status?.status_details}</p>
            <p>Status Date: {this.props.store.trackingReducer?.tracking_status?.status_date}</p>
            <p></p>
            <button onClick={this.getTracking}>Update Tracking Status</button>
            </>
            : <p>No Tracking Number assigned to this task yet.</p>
            }
         </div>
      );
   }
}

export default connect(mapStoreToProps)(TrackingApi);
