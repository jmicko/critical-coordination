import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminLocation/AdminLocation.css'

class AdminLocation extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate lists/tables
    this.props.dispatch({type: 'FETCH_ALLLOCATION'});
}

  state = {
    stateBuffer: 0,
  }


  render() {
    return (
      <div>
        <h3>Admin <span style={{textDecoration: "underline"}}>Location</span> Page, {this.props.store.user.first_name}!</h3>

              <button >Add Location</button>
              <table className="tableClass">
                <thead className="headerClass">
                  <tr><th>Company</th><th>Name</th><th>Address</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                </thead>
                <tbody className="bodyClass">
                    {this.props.store.admin.allLocationReducer.map((lineItem, index) => {
                        return (
                          <tr key={index}>
                              <td>{lineItem.company_name}</td>
                              <td>{lineItem.location_name}</td>
                              <td>{lineItem.address}</td>
                              <td><button className="adminButtonClass">Modify</button></td>
                              <td><button className="adminButtonClass">Delete</button></td>
                          </tr>
                        );
                    })} 
                </tbody>
              </table>
      </div>
    );
  }
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminLocation);
