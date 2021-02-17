import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TrackingApi extends Component {
   state = {
   };

   componentDidMount() {
      this.getTracking();
   }

   getTracking = () => {
      if (this.props.tracking_number) {
         let tracking_data = {
            carrier: ``,
            tracking_number: '',
         }
         if (this.props.tracking_number.substring(0, 2) == '1Z') {
            tracking_data = {
               carrier: 'ups',
               tracking_number: this.props.tracking_number
            }
         } else {
            tracking_data = {
               carrier: 'fedex',
               tracking_number: this.props.tracking_number
            }
         }
         this.props.dispatch({ type: 'GET_TRACKING_DATA', payload: tracking_data })
      }
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
                  <p>Status Date: {this.props.store.trackingReducer?.tracking_status?.status_date}</p>
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
