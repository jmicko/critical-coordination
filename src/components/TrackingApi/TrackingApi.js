import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TrackingApi extends Component {
   state = {
   };

   //runs a pull for a tracking information via shippo upon component load
   componentDidMount() {
      this.getTracking();
   }

   getTracking = () => {
      //runs the tracking call if a tracking number is present
      if (this.props.tracking_number) {
         let tracking_data = {
            carrier: ``,
            tracking_number: '',
         }
         //checks te see if its a UPS tracking number (they all start with 1Z)
         if (this.props.tracking_number.substring(0, 2) === '1Z') {
            tracking_data = {
               carrier: 'ups',
               tracking_number: this.props.tracking_number
            }
         //all other calls to API will assume a fedex number - can create more logic here to differentiate different trackers if desired
         } else {
            tracking_data = {
               carrier: 'fedex',
               tracking_number: this.props.tracking_number
            }
         }
         this.props.dispatch({ type: 'GET_TRACKING_DATA', payload: tracking_data })
      }
      console.log('no tracking information present, no call to shippo made');
   }

   render() {
      return (
         <div>
            <h4>Tracking Status</h4>
            {this.props.tracking_number
               ?
               <>
                  <div className="highlighter light">
                     <p><strong>Status Details: {this.props.store.trackingReducer?.tracking_status?.status_details}</strong></p>
                  </div>
                  <p>Tracking Number: {this.props.tracking_number}</p>
                  {this.props.store.trackingReducer.eta &&
                     <p>ETA: {this.props.store.trackingReducer.eta}</p>
                  }
                  <p>Status Date: {this.props.store.trackingReducer?.tracking_status?.status_date.substring(0,10)}</p>
                  <p></p>
                  <button className="btn" onClick={this.getTracking}>Refresh Tracking Status</button>
               </>
               :
               <p>No Tracking Number assigned to this task yet.</p>
            }
         </div>
      );
   }
}

export default connect(mapStoreToProps)(TrackingApi);
