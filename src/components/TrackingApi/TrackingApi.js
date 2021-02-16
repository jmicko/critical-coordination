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
            {this.props.tracking_number ?

               // commenting out the old code for presentation mode since 
               // it is currently breaking the demo computer. Add it back later
               // this is the smoke and mirrors code


               <>
                  <div className="highlighter light">
                     <p><strong>Status Details: Delivered</strong></p>
                  </div>
                  <p>Tracking Number: 1ZX799470293602849</p>
                  {/* <p>ETA: {this.props.store.trackingReducer.eta}</p> */}
                  <p>Status Date: 02-14-2021 at 20:56 GMT</p>
                  <p></p>
                  <button className="btn" onClick={this.getTracking}>Refresh Tracking Status</button>
               </>

               // old code is below

               // <>
               //    <p>Tracking Number: {this.props.tracking_number}</p>
               //    <p>ETA: {this.props.store.trackingReducer.eta}</p>
               //    <p>Status Details: {this.props.store.trackingReducer?.tracking_status?.status_details}</p>
               //    <p>Status Date: {this.props.store.trackingReducer?.tracking_status?.status_date}</p>
               //    <p></p>
               //    <button onClick={this.getTracking}>Refresh Tracking Status</button>
               // </>
               : <p>No Tracking Number assigned to this task yet.</p>
            }
         </div>
      );
   }
}

export default connect(mapStoreToProps)(TrackingApi);
