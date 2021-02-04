import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminCompany/AdminCompany.css'

class AdminCompany extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate lists/tables
    this.props.dispatch({type: 'FETCH_ALLCOMPANY'});
}

  state = {
    stateBuffer: 0,
  }


  render() {
    return (
      <div>
        <h3>Admin <span style={{textDecoration: "underline"}}>Company</span> Page, {this.props.store.user.first_name}!</h3>

              <button>Add Company</button>
              <table className="tableClass">
                <thead className="headerClass">
                  <tr><th>Company Name</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                </thead>
                <tbody className="bodyClass">
                    {this.props.store.admin.allCompanyReducer.map((lineItem, index) => {
                        return (
                          <tr key={index}>
                              <td>{lineItem.company_name}</td>
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
export default connect(mapStoreToProps)(AdminCompany);
